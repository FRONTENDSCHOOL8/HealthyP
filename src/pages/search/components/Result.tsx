import { RecipeCard } from '@/components';
import { chooseQuery } from '@/stores/stores';
import getPbImage from '@/util/data/getPBImage';
import { useAtom } from 'jotai';
import { memo, useEffect, useState } from 'react';
import foodDefaultImg from '@/assets/images/flower3.jpg';
import { RecipesExpand } from '@/types';

export default function ResultComponent() {
  const [query] = useAtom(chooseQuery); // 선택 결과
  const [sessionData, setSessionData] = useState<RecipesExpand[]>([]);

  useEffect(() => {
    const sessionDataRaw = sessionStorage.getItem('selectedRecipe');
    if (sessionDataRaw) {
      const sessionDataParsed = JSON.parse(sessionDataRaw);
      setSessionData(sessionDataParsed);
    }
  }, []);

  return (
    <>
      <select name="정렬방법" className="w-115pxr self-end">
        <option value="최신순">최신순</option>
        <option value="인기순">인기순</option>
        <option value="리뷰 많은 순">리뷰 많은 순</option>
      </select>

      <div className="grid gap-4 grid-cols-2 justify-center w-full">
        {/* sessionData가 있을 경우 세션 데이터로 렌더링 */}
        {sessionData
          ? sessionData.map(({ title, id, expand, image }, idx) => {
              const url = getPbImage('recipes', id, image);
              return (
                <div key={idx} className=" rounded-[5px]">
                  <RecipeCard title={title} url={url || foodDefaultImg} rating={expand.rating} id={id} />
                </div>
              );
            })
          : // sessionData가 없을 경우 query 데이터로 렌더링
            query?.map(({ title, id, expand, image }, idx) => {
              const url = getPbImage('recipes', id, image);
              return (
                <div key={idx} className=" rounded-[5px]">
                  <RecipeCard title={title} url={url || foodDefaultImg} rating={expand.rating} id={id} />
                </div>
              );
            })}
      </div>
    </>
  );
}

export const Result = memo(ResultComponent);
