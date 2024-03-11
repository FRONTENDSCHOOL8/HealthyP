import getPbImage from '@/util/data/getPBImage';

import { db } from '@/api/pocketbase';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ListResult, RecordModel } from 'pocketbase';
import { SwiperMain, RecipeCard } from '@/components';

import foodDefaultImg from '@/assets/images/flower3.jpg';

function FakeButtons() {
  return (
    <ul className="flex w-full justify-center py-30pxr gap-32pxr">
      <li className="flex flex-col items-center">
        <Link to="../search" className="h-50pxr w-50pxr bg-gray-400"></Link>
        <p>건강식</p>
      </li>
      <li className="flex flex-col items-center">
        <Link to="../search" className="h-50pxr w-50pxr bg-gray-400"></Link>
        <p>다이어트</p>
      </li>
      <li className="flex flex-col items-center">
        <Link to="../search" className="h-50pxr w-50pxr bg-gray-400"></Link>
        <p>벌크업</p>
      </li>
      <li className="flex flex-col items-center">
        <Link to="../search" className="h-50pxr w-50pxr bg-gray-400"></Link>
        <p>비건</p>
      </li>
    </ul>
  );
}

export function MainPage() {
  const [data, setData] = useState<ListResult<RecordModel>>();

  useEffect(() => {
    const fetchData = async () => {
      const getRecipeData = async () => await db.collection('recipes').getList(1, 10, { expand: 'rating' });

      // getRecipeData 함수의 결과를 기다립니다.
      const recipeData: ListResult<RecordModel> = await getRecipeData();

      // 실제 데이터를 상태에 설정합니다.
      setData(recipeData);
    };

    // fetchData 함수를 호출합니다.
    fetchData();

    return () => {
      db.collection('users').unsubscribe();
    };
  }, []);

  return (
    <div className="overflow-y-scroll overflow-x-hidden h-full w-full pb-90pxr no-scrollbar">
      <SwiperMain />
      <FakeButtons />
      <section>
        <Link to={'bookmark'} className="flex pl-14pxr pr-10pxr py-10pxr text-title-2-em justify-between">
          <h2>오늘의 레시피</h2>
          <span className="size-30pxr bg-arrow-small-icon rotate-[270deg] bg-center"></span>
        </Link>
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex gap-2 px-side w-max pb-2">
            {data?.items &&
              data?.items.map(({ id, title, expand, image }) => {
                const url = getPbImage('recipes', id, image);
                return (
                  <RecipeCard
                    key={id}
                    id={id}
                    title={title}
                    url={image ? url : foodDefaultImg}
                    rating={expand?.rating}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
