import { getDataAtomFamily } from '@/util';
import { useAtom } from 'jotai';
import SwiperMain from '@/components/swipers/SwiperMain';
import { Link } from 'react-router-dom';
import { pb } from '@/api/pocketbase';

import RecipeCard from '@/components/cards/recipeCard/RecipeCard';
import { useEffect, useRef } from 'react';
import { RecipesResponse } from '@/types/Database';

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
  const urls = useRef(null);
  const [{ data, loading, error }] = useAtom(
    getDataAtomFamily({
      item: 'recipes_duplicate',
      typeOfGetData: 'getFullList',
      options: { expand: 'rating' },
    })
  );

  if (data) {
    const urlArr = data.map((data: object) =>
      pb.files.getUrl(data, data?.image)
    );
    urls.current = urlArr;
  }

  if (loading)
    return (
      <div>
        <p>스켈레톤 ui 나올듯?</p>
      </div>
    );
  if (error)
    return (
      <div>
        <p>에러</p>
      </div>
    );

  return (
    <div className="overflow-y-scroll overflow-x-hidden h-full w-full pb-90pxr no-scrollbar">
      <SwiperMain />
      <FakeButtons />
      <section>
        <Link
          to={'bookmark'}
          className="flex pl-14pxr pr-10pxr py-10pxr text-title-2-em justify-between"
        >
          <h2>오늘의 레시피</h2>
          <span className="size-30pxr bg-arrow-small-icon rotate-[270deg] bg-center"></span>
        </Link>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-2 px-side w-max pb-2">
            {data &&
              data.map(({ id, title, expand }, idx) => {
                return (
                  <RecipeCard
                    key={id}
                    id={id}
                    title={title}
                    url={urls?.current[idx]}
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
