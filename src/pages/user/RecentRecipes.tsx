import { Header, Review, Star } from '@/components';
import { recentRecipesAtom } from '@/stores/stores';
import getPbImage from '@/util/data/getPBImage';
import { AnimatePresence, PanInfo, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { RecordModel } from 'pocketbase';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Profile from './components/Profile';
import Tab from './components/Tab';
import { db } from '@/api/pocketbase';

// Animation Properties
const DELETE_BTN_WIDTH = 70;
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
  const [recentRecipes, setRecentRecipes] = useAtom(recentRecipesAtom);

  useEffect(() => {
    const recentViewRaw = sessionStorage.getItem('recentRecipe');
    const recentViewArray: { id: string }[] = recentViewRaw
      ? JSON.parse(recentViewRaw)
      : [];

    const fetchData = async () => {
      const recentViewRecipes: RecordModel[] = [];

      for (const [, item] of recentViewArray.entries()) {
        const recentView = await db.collection('recipes').getFullList({
          filter: `id = "${item.id}"`,
        });

        // find 메소드를 사용하여 조건에 맞는 첫 번째 레시피 객체를 찾아 recentViewRecipes 배열에 추가
        const recipe: RecordModel | undefined = recentView.find(
          (recipeItem: Recipe) => recipeItem.id
        );
        if (recipe) {
          recentViewRecipes.push(recipe);
        }
      }
      setRecentRecipes(recentViewRecipes);
    };

    fetchData();
  }, [setRecentRecipes]);

  const handleDragEnd = async (
    info: PanInfo,
    recipeId: string | RecordModel
  ) => {
    const dragDistance = info.point.x;

    if (dragDistance < -DELETE_BTN_WIDTH) {
      if (recentRecipes) {
        // 현재 상태에서 해당 id의 recipe를 제거
        const newRecipes = recentRecipes.filter((id) => id !== recipeId);
        setRecentRecipes(newRecipes);

        // sessionStorage 업데이트
        const updatedRecentView = recentRecipes.filter(
          (item: RecordModel) => item.id !== recipeId
        );
        sessionStorage.setItem(
          'recentRecipe',
          JSON.stringify(updatedRecentView)
        );
        setRecentRecipes(updatedRecentView);
      }
    }
  };

  return (
    <>
      {recentRecipes ? (
        <div className="w-full grow bg-white relative p-14pxr flex flex-col gap-8pxr pb-140pxr ">
          <ul className="flex flex-col gap-10pxr">
            <AnimatePresence>
              {recentRecipes &&
                recentRecipes.map((item: RecordModel) => {
                  if (item) {
                    return (
                      <motion.li
                        key={item.id}
                        exit={MESSAGE_DELETE_ANIMATION}
                        transition={MESSAGE_DELETE_TRANSITION}
                        className="relative "
                      >
                        <motion.div
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          onDragEnd={(_, info) => handleDragEnd(info, item.id)}
                          key={item.id}
                          className="flex flex-row items-center h-full gap-12pxr py-14pxr z-10 relative bg-white"
                        >
                          <div className="w-100pxr h-100pxr rounded-[12px]">
                            <img
                              src={getPbImage('recipes', item.id, item.image)}
                              alt=""
                              className="w-full h-full rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-between gap-12pxr h-100pxr">
                            <div className="flex flex-col gap-4pxr">
                              <h2 className="text-sub-em w-212pxr line-clamp-1">
                                {item.title}
                              </h2>
                              <p className="text-cap-1 w-212pxr line-clamp-2">
                                {item.desc}
                              </p>
                            </div>
                            <div className="flex px-2pxr gap-4pxr items-center">
                              <Link
                                to={'/'}
                                className="fit-content flex gap-4pxr"
                              >
                                <Star rating={item.rating} />
                                <Review
                                  rating={item.rating}
                                  caseType={'literal'}
                                />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                        <div className="absolute bg-red rounded-xl right-2pxr top-1/2 transform -translate-y-1/2 h-[calc(100%-2px)] w-70pxr flex justify-center items-center">
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
