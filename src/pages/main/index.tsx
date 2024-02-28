import { pb } from '@/api/pocketbase';
import RecipeCard from '@/components/recipeCard/RecipeCard';
import { getDataAtomFamily } from '@/util';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export function MainPage() {
  const urls = useRef(null);
  const [{ data, loading, error }] = useAtom(
    getDataAtomFamily({
      item: 'recipes',
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
  console.log(data);
  return (
    <div>
      <section>
        <Link
          to={'bookmark'}
          className="flex pl-14pxr pr-10pxr py-10pxr text-title-2-em justify-between"
        >
          <h2>오늘의 레시피</h2>
          <span className="size-30pxr bg-arrow-small-icon rotate-[270deg] bg-center"></span>
        </Link>
        <div className="w-full overflow-x-scroll">
          <div className="flex gap-2 px-side w-max pb-2">
            {data &&
              data.map(({ id, title, expand }, idx) => {
                return (
                  <RecipeCard
                    key={id}
                    title={title}
                    url={urls?.current[idx]}
                    rating={expand.rating}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
