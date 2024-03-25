import { db } from '@/api/pocketbase';
import { DefaultLoader, Header, LargeCard, TwoButtonModal } from '@/components';
import useNotificationData from '@/hooks/useNotificationData';
import useProfileData from '@/hooks/useProfileData';
import { isStore, myRecipesAtom } from '@/stores/stores';
import getPbImage from '@/util/data/getPBImage';
import { useAtom, useSetAtom } from 'jotai';
import { RecordModel } from 'pocketbase';
import { useEffect, useState } from 'react';
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
        <DefaultLoader />
      )}
    </>
  );
};

export function MyRecipes() {
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
      <MyRecipesContainer />
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
