import { db } from '@/api/pocketbase';
import { Header, Review, Star, TwoButtonModal } from '@/components';
import useNotificationData from '@/hooks/useNotificationData';
import { deleteRecentRecipeAtom, isStore, recentRecipesAtom } from '@/stores/stores';
import getPbImage from '@/util/data/getPBImage';
import DOMPurify from 'dompurify';
import { AnimatePresence, PanInfo, motion } from 'framer-motion';
import { useAtom, useSetAtom } from 'jotai';
import { RecordModel } from 'pocketbase';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './components/Profile';
import Tab from './components/Tab';

const RecipeContainer = () => {
  const [recentRecipes, setRecentRecipes] = useAtom(recentRecipesAtom);
  const [deleteRecentRecipeId, setDeleteRecentRecipeId] = useAtom(deleteRecentRecipeAtom);

  const recentViewRaw = sessionStorage.getItem('recentRecipe');

  useEffect(() => {
    const recentViewArray: { id: string }[] = recentViewRaw ? JSON.parse(recentViewRaw) : [];

    const fetchData = async () => {
      const recentViewRecipes = [];

      const dompurify = (data: string) => {
        return DOMPurify.sanitize(data, {
          ALLOWED_TAGS: ['br', 'em'],
        });
      };

      for (const item of recentViewArray) {
        const recentView = await db
          .collection('recipes')
          .getFullList({
            expand: 'rating',
            filter: `id = "${item.id}"`,
          })
          .then((data) => data)
          .catch((err) => {
            if (!err.isAbort) {
              console.warn('non cancellation error:', err);
            }
          });

        const recipeObj = (recentView as RecordModel[])?.[0];

        if (recipeObj) {
          recipeObj.desc = dompurify(recipeObj.desc);
        } else {
          return;
        }

        recentViewRecipes.push(recipeObj);
      }

      setRecentRecipes(recentViewRecipes);
    };

    fetchData();
  }, [recentViewRaw, setRecentRecipes]);

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
    (info: PanInfo, recipeId: string) => {
      dragState.current.end = info.point.x;
      // direction 반대 차단
      if (dragState.current.end > dragState.current.start) return;
      const dragDistance = dragState.current.start - dragState.current.end;
      if (dragDistance > DELETE_BTN_WIDTH) {
        setDeleteRecentRecipeId(recipeId);
      }
    },
    [setDeleteRecentRecipeId]
  );

  useEffect(() => {
    const deleteRecentRecipe = async () => {
      if (deleteRecentRecipeId) {
        // 현재 상태에서 해당 id의 recipe를 제거
        const newRecipes = recentRecipes.filter((item) => item.id !== deleteRecentRecipeId);
        setRecentRecipes(newRecipes);

        // sessionStorage 업데이트
        const updatedRecentView = recentRecipes.filter((item: RecordModel) => item.id !== deleteRecentRecipeId);
        sessionStorage.setItem('recentRecipe', JSON.stringify(updatedRecentView));
        setRecentRecipes(updatedRecentView);
      }
    };

    deleteRecentRecipe();
  }, [deleteRecentRecipeId, recentRecipes, setRecentRecipes]);

  return (
    <>
      {
        <div className="w-full grow bg-white relative p-14pxr flex flex-col gap-8pxr pb-140pxr ">
          <ul className="flex flex-col gap-10pxr divide-y-[1px] divide-gray_200">
            <AnimatePresence>
              {recentRecipes &&
                recentRecipes.map((item: RecordModel) => {
                  if (item) {
                    return (
                      <motion.li
                        key={item.id}
                        exit={MESSAGE_DELETE_ANIMATION}
                        transition={MESSAGE_DELETE_TRANSITION}
                        className="relative divide-x-[1px] divide-gray_150"
                      >
                        <motion.div
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          onDragStart={(_, info) => handleDragStart(info)}
                          onDragEnd={(_, info) => handleDragEnd(info, item.id)}
                          key={item.id}
                          className="flex flex-row items-center h-full gap-10pxr pt-14pxr pb-6pxr z-10 relative bg-white"
                        >
                          <Link to={`/detail/${item.id}`} className="basis-1/3">
                            <div className="aspect-square rounded-[12px]">
                              <img
                                src={getPbImage('recipes', item.id, item.image)}
                                alt=""
                                className="w-full h-full rounded-lg object-cover min-w-100pxr min-h-100pxr"
                              />
                            </div>
                          </Link>
                          <div className="basis-2/3 flex flex-col gap-12pxr h-full w-full justify-between min-h-100pxr">
                            <Link to={`/detail/${item.id}`} className="flex flex-col gap-4pxr">
                              <h2 className="text-sub-em line-clamp-1">{item.title}</h2>
                              <p className="text-cap-1 line-clamp-2">{item.desc}</p>
                            </Link>
                            <div className="flex flex-row px-2pxr gap-4pxr items-center">
                              <Link to={`/reviews/${item.id}`} className="fit-content flex gap-4pxr">
                                <Star rating={item.expand?.rating} />
                                <Review rating={item.expand?.rating} caseType={'literal'} />
                              </Link>
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
      }
    </>
  );
};

export function RecentRecipes() {
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
      <RecipeContainer />
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
