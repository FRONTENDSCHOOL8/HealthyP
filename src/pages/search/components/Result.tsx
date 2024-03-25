import { RecipeCard } from '@/components';
import { chooseQuery } from '@/stores/stores';
import getPbImage from '@/util/data/getPBImage';
import { useAtom } from 'jotai';
import { memo, useEffect, useState } from 'react';
import foodDefaultImg from '@/assets/images/flower3.jpg';
import { RecipesRatingExpand } from '@/types';

export default function ResultComponent() {
  const [query] = useAtom(chooseQuery); // 선택 결과
  const [sessionData, setSessionData] = useState<RecipesRatingExpand[] | undefined>([]);

  console.log(query);

  useEffect(() => {
    const sessionDataRaw = sessionStorage.getItem('selectedRecipe');
    if (sessionDataRaw) {
      const sessionDataParsed = JSON.parse(sessionDataRaw);
      setSessionData(sessionDataParsed);
    }
  }, []);

  return (
    <>
      <div className="grid gap-4 grid-cols-2 justify-center w-full">
        {/* sessionData가 있을 경우 세션 데이터로 렌더링 */}
        {sessionData
          ? sessionData.map(({ title, id, expand, image }, idx) => {
              const url = getPbImage('recipes', id, image);
              return (
                <div key={idx} className=" rounded-[5px]">
                  <RecipeCard title={title} url={url || foodDefaultImg} rating={expand?.rating} id={id} />
                </div>
              );
            })
          : // sessionData가 없을 경우 query 데이터로 렌더링
            query?.map(({ title, id, expand, image }, idx) => {
              const url = getPbImage('recipes', id, image);
              return (
                <div key={idx} className=" rounded-[5px]">
                  <RecipeCard title={title} url={url || foodDefaultImg} rating={expand?.rating} id={id} />
                </div>
              );
            })}
      </div>
    </>
  );
}

export const Result = memo(ResultComponent);
