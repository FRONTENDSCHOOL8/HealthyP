import { db } from '@/api/pocketbase';
import { LargeCard } from '@/components';
import { useState, useEffect } from 'react';
import { ListResult, RecordModel } from 'pocketbase';

import getPbImage from '@/util/data/getPBImage';

export function BookmarkPage2() {
  const [data, setData] = useState<ListResult<RecordModel>>();
  const [userData, setUserData] = useState<RecordModel>();

  useEffect(() => {
    const fetchData = async () => {
      const getRecipeData = async () => await db.collection('recipes').getList(1, 10, { expand: 'rating, profile' });

      // getRecipeData 함수의 결과를 기다립니다.
      const recipeData: ListResult<RecordModel> = await getRecipeData();

      // 실제 데이터를 상태에 설정합니다.
      setData(recipeData);
    };

    async function getUserData() {
      const currentUser = localStorage.getItem('pocketbase_auth');
      if (currentUser === null) return;
      const userId = JSON.parse(currentUser).model.id;
      const response = await db.collection('users').getOne(userId, { requestKey: null });
      if (response === undefined) return;
      setUserData(response);
    }

    // fetchData 함수를 호출합니다.
    getUserData();
    fetchData();
    db.collection('users').subscribe('*', getUserData);

    return () => {
      db.collection('users').unsubscribe();
    };
  }, []);

  return (
    <div className="w-full h-full bg-gray-200 overflow-auto">
      <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">
        {data?.items &&
          data?.items.map((data, idx) => {
            if (data) {
              const url = getPbImage('recipes', data.id, data.image);
              return (
                <LargeCard
                  key={idx}
                  id={data.id}
                  userData={userData}
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
  );
}
