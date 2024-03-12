import { db } from '@/api/pocketbase';
import { Header } from '@/components';
import useNotificationData from '@/hooks/useNotificationData';
import useProfileData from '@/hooks/useProfileData';
import { deleteNotificationAtom, notificationDataAtom, userIdAtom } from '@/stores/stores';
import { MyNotification } from '@/types';
import getPbImage from '@/util/data/getPBImage';
import DOMPurify from 'dompurify';
import { AnimatePresence, PanInfo, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import moment from 'moment';
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotificationContainer = () => {
  const { id } = useProfileData();
  const [userId, setUserId] = useAtom(userIdAtom);
  const [notification, setNotification] = useAtom(notificationDataAtom);
  const [deleteNotificationId, setDeleteNotificationId] = useAtom(deleteNotificationAtom);
  const { setCountNotification, hasNotification } = useNotificationData();

  useEffect(() => {
    setUserId(id);
  }, [id, setUserId]);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const getNotificationData = async () =>
          await db.collection('notifications').getFullList({
            expand: 'recipe, review, review.creator',
            filter: `recipe.profile="${userId}" && is_read=false`,
            sort: '-created',
          });

        const notificationData = await getNotificationData();

        setCountNotification(notificationData.length.toString());

        const myNotifications = [];

        for (const item of notificationData) {
          const { id, is_read, expand } = item;

          // expand가 없거나 recipe, review가 없는 경우 기본값으로 처리
          const recipe = expand?.recipe ?? { id: null, title: null };
          const review = expand?.review ?? { id: null, creator: null, review_text: null };

          const { id: recipe_id, title: recipe_title } = recipe;

          const {
            id: review_id,
            creator: review_creator_id,
            review_text: review_text_rich,
            created: review_created,
          } = review;
          const review_creator_avatar = review.expand.creator.avatar;
          const review_creator_name = review.expand.creator.name;
          const review_text = DOMPurify.sanitize(review_text_rich, {
            ALLOWED_TAGS: ['br', 'em'],
          });
          const review_created_before = calcTimeDiff(review_created);

          myNotifications.push({
            id,
            user_id: userId,
            recipe_id,
            recipe_title,
            review_id,
            review_created_before,
            review_creator_id,
            review_creator_name,
            review_creator_avatar,
            review_text,
            is_read,
          });
        }

        setNotification(myNotifications);
      };
      fetchData();
    }
  }, [userId, setNotification]);

  const calcTimeDiff = (dateString: string) => {
    const now = moment();
    const reviewCreated = moment(dateString);
    const diff = moment.duration(now.diff(reviewCreated));
    const days = diff.days();
    const hours = diff.hours();
    const minutes = diff.minutes();

    const timeDiffArr = [];
    if (days) {
      timeDiffArr.push(`${days}일`);
    }
    if (hours) {
      timeDiffArr.push(`${hours}시간`);
    }
    if (minutes) {
      timeDiffArr.push(`${minutes}분`);
    }

    return timeDiffArr.join(' ');
  };

  const handleClick = (title: string, id: string): MouseEventHandler<HTMLAnchorElement> | undefined => {
    const newRecipe = { title, id };

    // sessionStorage에서 recentRecipe 목록을 가져옴
    const recentRecipesRaw = sessionStorage.getItem('recentRecipe');
    const recentRecipes = recentRecipesRaw ? JSON.parse(recentRecipesRaw) : [];

    // recentRecipes가 배열이 아닌 경우를 처리(예상치 못한 값이 있는 경우)
    if (!Array.isArray(recentRecipes)) {
      sessionStorage.setItem('recentRecipe', JSON.stringify([newRecipe]));
      return;
    }

    // 이미 리스트에 같은 레시피가 있는지 확인
    const existingIndex = recentRecipes.findIndex((r) => r.id === newRecipe.id);

    // 레시피가 이미 존재한다면 기존의 것을 제거
    if (existingIndex !== -1) {
      recentRecipes.splice(existingIndex, 1);
    }

    // 새로운 레시피를 추가
    recentRecipes.push(newRecipe);

    // 레시피 목록이 5개를 넘으면, 가장 오래된 레시피를 제거
    while (recentRecipes.length > 5) {
      recentRecipes.shift();
    }

    // 업데이트된 레시피 목록을 sessionStorage에 저장
    sessionStorage.setItem('recentRecipe', JSON.stringify(recentRecipes));
  };

  // Animation Properties
  const DELETE_BTN_WIDTH = 60;
  const MESSAGE_DELETE_ANIMATION = { height: 0, opacity: 0 };
  const MESSAGE_DELETE_TRANSITION = {
    opacity: {
      transition: {
        duration: 0,
      },
    },
  };

  const dragState = useRef({
    start: 0,
    end: 0,
  });

  const handleDragStart = (info: PanInfo) => {
    dragState.current.start = info.point.x;
  };

  const handleDragEnd = useCallback(
    (info: PanInfo, notificationId: string) => {
      dragState.current.end = info.point.x;
      // direction 반대 차단
      if (dragState.current.end > dragState.current.start) return;
      const dragDistance = dragState.current.start - dragState.current.end;
      if (dragDistance > DELETE_BTN_WIDTH) {
        setDeleteNotificationId(notificationId);
      }
    },
    [setDeleteNotificationId]
  );

  useEffect(() => {
    const deleteRecentRecipe = async () => {
      if (deleteNotificationId) {
        // 알림 제거x 해당 알림의 is_read값을 true로 변경
        const data = {
          is_read: true, // 'isRead' 필드를 true로 업데이트
        };
        await db.collection('notifications').update(deleteNotificationId, data);
      }
      const newRecipes = notification.filter((item) => item.id !== deleteNotificationId);
      setNotification(newRecipes);
      setCountNotification(newRecipes.length.toString());
    };

    deleteRecentRecipe();
  }, [deleteNotificationId, setNotification]);

  return (
    <>
      {hasNotification ? (
        <div className="w-full h-full grow bg-gray_150 relative p-14pxr flex flex-col gap-8pxr pb-140pxr ">
          <ul className="flex flex-col gap-10pxr">
            <AnimatePresence>
              {notification &&
                notification.map((item: MyNotification) => {
                  if (item) {
                    return (
                      <motion.li
                        key={item.id}
                        exit={MESSAGE_DELETE_ANIMATION}
                        transition={MESSAGE_DELETE_TRANSITION}
                        className="relative"
                      >
                        <motion.div
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          onDragStart={(_, info) => handleDragStart(info)}
                          onDragEnd={(_, info) => handleDragEnd(info, item.id)}
                          key={item.id}
                          className="flex flex-row items-center h-full gap-10pxr py-14pxr px-16pxr z-10 relative bg-white rounded-[12px] shadow-default"
                        >
                          <Link
                            to={`/detail/${item.recipe_id}`}
                            onClick={() => handleClick(item.recipe_title, item.recipe_id)}
                            className=""
                          >
                            <div className="flex flex-col gap-10pxr">
                              <div className="flex flex-row justify-start items-center gap-6pxr">
                                <img
                                  src={getPbImage('users', item.review_creator_id, item.review_creator_avatar)}
                                  alt=""
                                  className="rounded-full object-cover w-30pxr h-30pxr"
                                />
                                <h2 className="text-foot-em">{item.review_creator_name}</h2>
                                <div className="w-3pxr h-3pxr rounded-full bg-gray_200"></div>
                                <span className="text-foot text-gray_500">{item.review_created_before} 전</span>
                              </div>
                              <div className="flex flex-col gap-4pxr">
                                <h3 className="text-foot-em">{item.recipe_title}</h3>
                                <p className="text-cap-1 text-gray_700">{item.review_text}</p>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                        <div className="absolute bg-red rounded-xl right-2pxr top-1/2 transform -translate-y-1/2 h-[calc(80%-2px)] mt-1.5 w-60pxr flex justify-center items-center text-body text-gray_500">
                          삭제
                        </div>
                      </motion.li>
                    );
                  }
                })}
            </AnimatePresence>
          </ul>
        </div>
      ) : (
        <div className="w-full h-full bg-gray_150 p-14pxr pb-140pxr flex justify-center items-center">
          <p>알림을 모두 확인했습니다</p>
        </div>
      )}
    </>
  );
};

export function Notifications() {
  const { countNotification } = useNotificationData();
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Header option="titlewithCloseAndFn" title={`새로운 알림 ${countNotification}`} handleClick={handleHeaderClick} />
      <NotificationContainer />
    </>
  );
}
