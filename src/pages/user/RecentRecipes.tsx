import { db } from '@/api/pocketbase';
import { Header, Review, Star } from '@/components';
import { defaultRecipesAtom, ratingDataAtom, recentRecipesAtom } from '@/stores/stores';
import getPbImage from '@/util/data/getPBImage';
import { AnimatePresence, PanInfo, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { RecordModel } from 'pocketbase';
import { MouseEventHandler, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Profile from './components/Profile';
import Tab from './components/Tab';
import { RatingsResponse } from '@/types';
import DOMPurify from 'dompurify';

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

interface Recipe {
  id: string;
}

const RecipeContainer = () => {
  const [recipes, setRecipes] = useAtom(defaultRecipesAtom);
  const [recentRecipes, setRecentRecipes] = useAtom(recentRecipesAtom);
  const [ratingData, setRatingData] = useAtom(ratingDataAtom);

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

  const handleDragEnd = async (info: PanInfo, recipeId: string | RecordModel) => {
    const dragDistance = info.point.x;

    if (dragDistance < -DELETE_BTN_WIDTH) {
      if (recentRecipes) {
        // 현재 상태에서 해당 id의 recipe를 제거
        const newRecipes = recentRecipes.filter((id) => id !== recipeId);
        setRecentRecipes(newRecipes);

        // sessionStorage 업데이트
        const updatedRecentView = recentRecipes.filter((item: RecordModel) => item.id !== recipeId);
        sessionStorage.setItem('recentRecipe', JSON.stringify(updatedRecentView));
        setRecentRecipes(updatedRecentView);
      }
    }
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
                          onDragEnd={(_, info) => handleDragEnd(info, item.id)}
                          key={item.id}
                          className="flex flex-row items-center h-full gap-10pxr pt-14pxr pb-6pxr z-10 relative bg-white"
                        >
                          <Link
                            to={`/detail/${item.id}`}
                            onClick={handleClick(item.title, item.id)}
                            className="basis-1/3"
                          >
                            <div className="aspect-square rounded-[12px]">
                              <img
                                src={getPbImage('recipes', item.id, item.image)}
                                alt=""
                                className="w-full h-full rounded-lg object-cover min-w-100pxr min-h-100pxr"
                              />
                            </div>
                          </Link>
                          <div className="basis-2/3 flex flex-col gap-12pxr h-full w-full justify-between min-h-100pxr">
                            <Link
                              to={`/detail/${item.id}`}
                              onClick={handleClick(item.title, item.id)}
                              className="flex flex-col gap-4pxr"
                            >
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
  return (
    <>
      <Header option="onlyAlarm" />
      <Profile />
      <Tab />
      <RecipeContainer />
    </>
  );
}
