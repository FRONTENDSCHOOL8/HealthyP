import { db } from '@/api/pocketbase';
import { Header, TwoButtonModal } from '@/components';
import useNotificationData from '@/hooks/useNotificationData';
import useProfileData from '@/hooks/useProfileData';
import { deleteReviewAtom, isStore, reviewDataAtom } from '@/stores/stores';
import { MyReview } from '@/types';
import DOMPurify from 'dompurify';
import { AnimatePresence, PanInfo, motion } from 'framer-motion';
import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './components/Profile';
import Tab from './components/Tab';

const MyReviewsContainer = () => {
  const { id } = useProfileData();
  const [review, setReview] = useAtom(reviewDataAtom);
  const [deleteReviewId, setDeleteReviewId] = useAtom(deleteReviewAtom);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const myReviews = [];

        const getFullRecipesData = async () =>
          await db.collection('recipes').getFullList({
            expand: 'rating.creator',
            filter: `rating:length > 0 && rating.creator?~"${id}"`,
          });

        const fullRecipesData = await getFullRecipesData();

        for (const item of fullRecipesData) {
          const { id: recipe_id, title: recipe_title, expand: { rating } = {} } = item;
          for (const rate of rating) {
            if (rate.creator === id) {
              const { id: review_id, creator } = rate;
              const review_text = DOMPurify.sanitize(rate.review_text, {
                ALLOWED_TAGS: ['br', 'em'],
              });
              // 각 리뷰 데이터를 myReviews 배열에 추가
              myReviews.push({ recipe_id, recipe_title, review_id, creator, review_text });
            }
          }
        }
        setReview(myReviews);
      };

      fetchData();
    }
  }, [id, setReview]);

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
    (info: PanInfo, reviewId: string) => {
      dragState.current.end = info.point.x;
      // direction 반대 차단
      if (dragState.current.end > dragState.current.start) return;
      const dragDistance = dragState.current.start - dragState.current.end;
      if (dragDistance > DELETE_BTN_WIDTH) {
        setDeleteReviewId(reviewId);
      }
    },
    [setDeleteReviewId]
  );

  useEffect(() => {
    const deleteReview = async () => {
      if (deleteReviewId) {
        const getNotification = await db.collection('notifications').getFirstListItem(`review="${deleteReviewId}"`);

        await db.collection('ratings').delete(deleteReviewId);
        await db.collection('notifications').delete(getNotification.id);
      }
      const updatedReviews = review.filter((item) => item.review_id !== deleteReviewId);
      setReview(updatedReviews);
    };

    deleteReview();
  }, [deleteReviewId, setReview]);

  return (
    <>
      {review ? (
        <div className="w-full grow bg-white relative p-14pxr flex flex-col gap-8pxr pb-140pxr ">
          <ul className="flex flex-col gap-10pxr divide-y-[1px] divide-gray_200">
            <AnimatePresence>
              {review &&
                review.map((item: MyReview) => {
                  if (item) {
                    return (
                      <motion.li
                        key={item.review_id}
                        exit={MESSAGE_DELETE_ANIMATION}
                        transition={MESSAGE_DELETE_TRANSITION}
                        className="relative divide-x-[1px] divide-gray_150"
                      >
                        <motion.div
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          onDragStart={(_, info) => handleDragStart(info)}
                          onDragEnd={(_, info) => handleDragEnd(info, item.review_id)}
                          key={item.review_id}
                          className="flex flex-row items-center h-full gap-10pxr px-6pxr pt-14pxr pb-6pxr z-10 relative bg-white"
                        >
                          <div className="flex flex-col gap-12pxr h-full w-full justify-between min-h-100pxr">
                            <Link to={`/reviews/${item.recipe_id}`} className="flex flex-col gap-4pxr">
                              <h2 className="text-foot-em text-gray_700 line-clamp-1">{item.recipe_title}</h2>
                              <div className="flex flex-row gap-4pxr items-center">
                                <p className="text-cap-1 line-clamp-2 text-gray_500">리뷰 바로가기</p>
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                  >
                                    <path
                                      d="M8.8626 6.999L4.81444 3.15589C4.71598 3.06055 4.66701 2.94681 4.66753 2.81465C4.66805 2.68249 4.7184 2.56924 4.81861 2.47488C4.9188 2.38052 5.03815 2.33334 5.17663 2.33334C5.31513 2.33334 5.43432 2.38093 5.5342 2.47611L9.65018 6.38227C9.74364 6.47098 9.81144 6.56758 9.85356 6.67207C9.89569 6.77656 9.91675 6.88533 9.91675 6.99839C9.91675 7.11144 9.89569 7.22041 9.85356 7.32532C9.81144 7.43022 9.74364 7.52705 9.65018 7.61583L5.5342 11.5259C5.434 11.621 5.31405 11.668 5.17432 11.6666C5.0346 11.6653 4.91464 11.6179 4.81444 11.5244C4.71598 11.429 4.66675 11.3153 4.66675 11.1831C4.66675 11.051 4.71611 10.938 4.81482 10.8442L8.8626 6.999Z"
                                      fill="#3C3C43"
                                      fillOpacity="0.7"
                                    />
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <div className="flex flex-row px-2pxr gap-4pxr items-center text-sub text-black">
                              <p>{item.review_text}</p>
                            </div>
                          </div>
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
        <div>Loading...</div>
      )}
    </>
  );
};

export function MyReviews() {
  const navigate = useNavigate();
  const { hasNotification } = useNotificationData();
  const setIsAuth = useSetAtom(isStore);

  const openNotification = () => {
    navigate('/notifications');
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    sessionStorage.clear();
    localStorage.removeItem('pocketbase_auth');
    setIsAuth(false);
    navigate(0);
  };

  const handleLogout = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Header
        option="alarmWithLogout"
        handleClick={openNotification}
        hasNotification={hasNotification}
        logout={handleLogout}
      />
      <Profile />
      <Tab />
      <MyReviewsContainer />
      <TwoButtonModal
        isOpen={isOpen}
        closeModal={handleClose}
        confirmModal={handleConfirm}
        isAnimated={false}
        headline="로그아웃하시겠습니까?"
        where="메인페이지"
        textFirstLine="확인을 누르시면 로그아웃 후"
      />
    </>
  );
}
