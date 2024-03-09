import { Header, RecipeCard } from '@/components';
import { chooseQuery } from '@/stores/stores';
import getPbImage from '@/util/data/getPBImage';
import { useAtom } from 'jotai';
import { memo } from 'react';
import foodDefaultImg from '@/assets/images/flower3.jpg';

export default function ResultComponent() {
  const [selectedRecipe] = useAtom(chooseQuery);

  return (
    <>
      <Header option="searchWithFakeAndBack" />
      <div className="grid grid-cols-2 gap-4">
        {selectedRecipe?.map(({ title, id, expand, image }, idx) => {
          const url = getPbImage('recipes', id, image);
          return (
            <div key={idx} className=" rounded-[5px]">
              <RecipeCard
                title={title}
                url={url || foodDefaultImg}
                rating={expand?.rating}
                id={id}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export const Result = memo(ResultComponent);
