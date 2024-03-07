import { db } from '@/api/pocketbase';
import LargeCard from '@/components/cards/largeCard/LargeCard';
import { ListResult, RecordModel } from 'pocketbase';
import { useState, useEffect } from 'react';

export function BookmarkPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const getRecipeData = async () =>
        await db
          .collection('recipes')
          .getList(1, 10, { expand: 'rating, profile' });

      // getRecipeData 함수의 결과를 기다립니다.
      const recipeData: ListResult<RecordModel> = await getRecipeData();

      // 실제 데이터를 상태에 설정합니다.
      setData(recipeData);
    };

    // fetchData 함수를 호출합니다.
    fetchData();
  }, []);

  return (
    <div className="w-full h-svh bg-gray-200 overflow-auto">
      <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">
        {data?.items &&
          data?.items.map((data, idx) => {
            if (data) {
              return (
                <LargeCard
                  key={idx}
                  id={data.id}
                  rating={data.expand?.rating}
                  desc={data.desc}
                  title={data.title}
                  profile={data.expand?.profile}
                  profileImg="ss"
                />
              );
            }
          })}
      </div>
    </div>
  );
}
