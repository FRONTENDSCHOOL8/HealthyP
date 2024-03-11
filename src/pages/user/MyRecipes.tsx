import { db } from '@/api/pocketbase';
import { Header, LargeCard } from '@/components';
import { myRecipesAtom, userRecordId } from '@/stores/stores';
import getPbImage from '@/util/data/getPBImage';
import { useAtom } from 'jotai';
import { RecordModel } from 'pocketbase';
import { useEffect } from 'react';
import Profile from './components/Profile';
import Tab from './components/Tab';

export function MyRecipes() {
  const [id] = useAtom(userRecordId);
  const [myRecipes, setMyRecipes] = useAtom(myRecipesAtom);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const getRecipeData = async () =>
          await db.collection('recipes').getList(1, 10, {
            filter: `profile = "${id}"`,
          });

        const recipeData = await getRecipeData();

        setMyRecipes(recipeData);
      };

      fetchData();
    }
  }, [id]);

  return (
    <>
      <Header option="onlyAlarm" />
      <Profile />
      <Tab />
      {myRecipes ? (
        <div className="pb-140pxr">
          <div className="grid gap-6pxr grid-cols-card justify-center w-full bg-gray-200">
            {myRecipes &&
              myRecipes?.items &&
              myRecipes?.items.map((data: RecordModel, idx: number) => {
                if (data) {
                  const url = getPbImage('recipes', data.id, data.image);
                  return (
                    <LargeCard
                      key={idx}
                      id={data.id}
                      userData={data}
                      rating={data.expand?.rating}
                      url={data.image && url}
                      desc={data.desc}
                      title={data.title}
                      profile={data.expand?.profile}
                      keywords={data.keywords}
                    />
                  );
                }
              })}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
