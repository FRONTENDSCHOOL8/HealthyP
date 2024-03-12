import { db } from '@/api/pocketbase';
import { Header, LargeCard } from '@/components';
import useNotificationData from '@/hooks/useNotificationData';
import useProfileData from '@/hooks/useProfileData';
import { myRecipesAtom } from '@/stores/stores';
import getPbImage from '@/util/data/getPBImage';
import { useAtom } from 'jotai';
import { RecordModel } from 'pocketbase';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './components/Profile';
import Tab from './components/Tab';

const MyRecipesContainer = () => {
  const { id } = useProfileData();
  const [myRecipes, setMyRecipes] = useAtom(myRecipesAtom);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const getRecipeData = async () =>
          await db.collection('recipes').getList(1, 10, {
            filter: `profile = "${id}"`,
            sort: '-created',
          });

        const recipeData = await getRecipeData();

        setMyRecipes(recipeData);
      };

      fetchData();
    }
  }, [id, setMyRecipes]);

  return (
    <>
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
};

export function MyRecipes() {
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
      <MyRecipesContainer />
    </>
  );
}
