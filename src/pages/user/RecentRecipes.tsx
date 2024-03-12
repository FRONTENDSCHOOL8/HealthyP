import { db } from '@/api/pocketbase';
import { Header, Review, Star } from '@/components';
import useNotificationData from '@/hooks/useNotificationData';
import { defaultRecipesAtom, deleteRecentRecipeAtom, ratingDataAtom, recentRecipesAtom } from '@/stores/stores';
import { RatingsResponse } from '@/types';
import getPbImage from '@/util/data/getPBImage';
import DOMPurify from 'dompurify';
import { AnimatePresence, PanInfo, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { RecordModel } from 'pocketbase';
import { useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './components/Profile';
import Tab from './components/Tab';

interface Recipe {
  id: string;
}

const RecipeContainer = () => {
  const [recipes, setRecipes] = useAtom(defaultRecipesAtom);
  const [recentRecipes, setRecentRecipes] = useAtom(recentRecipesAtom);
  const [ratingData, setRatingData] = useAtom(ratingDataAtom);
  const [deleteRecentRecipeId, setDeleteRecentRecipeId] = useAtom(deleteRecentRecipeAtom);

  useEffect(() => {
    const recentViewRaw = sessionStorage.getItem('recentRecipe');
    const recentViewArray: { id: string }[] = recentViewRaw ? JSON.parse(recentViewRaw) : [];

    const fetchData = async () => {
      const recentViewRecipes: RecordModel[] = [];

      for (const [, item] of recentViewArray.entries()) {
        const recentView = await db.collection('recipes').getFullList({
          filter: `id = "${item.id}"`,
        });

        // find 메소드를 사용하여 조건에 맞는 첫 번째 레시피 객체를 찾아 recentViewRecipes 배열에 추가
        const recipe: RecordModel | undefined = recentView.find((recipeItem: Recipe) => recipeItem.id);
        if (recipe) {
          recentViewRecipes.push(recipe);
        }
      }

      setRecipes(recentViewRecipes);
    };

    fetchData();
  }, [setRecipes]);

  useEffect(() => {
    const dompurify = (data: string) => {
      return DOMPurify.sanitize(data, {
        ALLOWED_TAGS: ['br', 'em'],
      });
    };
    const dompurifyRecentRecipes = recipes.reduce<RecordModel[]>((acc: RecordModel[], recipe: RecordModel) => {
      return [...acc, { ...recipe, desc: dompurify(recipe.desc) }];
    }, [] as RecordModel[]);

    setRecentRecipes(dompurifyRecentRecipes);
  }, [setRecentRecipes]);

  useEffect(() => {
    const ratingsArray = recentRecipes.map((recipe) => recipe.rating);

    const fetchData = async () => {
      const ratingRecipes: RatingsResponse[][] | undefined = [];
      let ratingItems: RatingsResponse[] = [];

      for (const [, item] of ratingsArray.entries()) {
        for (const i of item) {
          const rating = await db.collection('ratings').getFullList({
            filter: `id = "${i}"`,
          });
          const ratingItem = rating.find((i) => i.id) as RatingsResponse;
          if (ratingItem) {
            ratingItems.push(ratingItem);
          }
        }

        ratingRecipes.push(ratingItems);
        ratingItems = [];
      }

      setRatingData(ratingRecipes);
    };
    fetchData();
  }, [recentRecipes, setRatingData]);

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
  }, [deleteRecentRecipeId, setRecentRecipes]);

  return (
    <>
      {ratingData ? (
        <div className="w-full grow bg-white relative p-14pxr flex flex-col gap-8pxr pb-140pxr ">
          <ul className="flex flex-col gap-10pxr divide-y-[1px] divide-gray_200">
            <AnimatePresence>
              {ratingData &&
                recentRecipes &&
                recentRecipes.map((item: RecordModel, idx: number) => {
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
                              {ratingData &&
                                ratingData.map((i, ratingIdx: number) => {
                                  if (idx === ratingIdx) {
                                    return (
                                      <Link
                                        key={ratingIdx}
                                        to={`/reviews/${item.id}`}
                                        className="fit-content flex gap-4pxr"
                                      >
                                        <Star rating={i} />
                                        <Review rating={i} caseType={'literal'} />
                                      </Link>
                                    );
                                  }
                                })}
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

export function RecentRecipes() {
  const navigate = useNavigate();
  const { hasNotification } = useNotificationData();

  const openNotification = () => {
    navigate('/notifications');
  };

  return (
    <>
      <Header option="onlyAlarm" handleClick={openNotification} hasNotification={hasNotification} />
      <Profile />
      <Tab />
      <RecipeContainer />
    </>
  );
}
