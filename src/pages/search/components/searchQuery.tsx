import { useAtom } from 'jotai';
import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchQuery, chooseQuery, isClick } from '@/stores/stores';
import { db } from '@/api/pocketbase';
import { RecipesRatingExpand } from '@/types';
import Result from './Result';
import { DefaultLoader } from '@/components';

// 쿼리 구독을 위한 함수
async function fetchRecipes() {
  const response = await db.collection('recipes').getFullList<RecipesRatingExpand>({ expand: 'rating' });
  return response;
}

// 캐싱된 데이터를 사용하여 검색 결과를 보여주는 컴포넌트
function SearchQueryComponent() {
  const [isButtonClick, setIsButtonClick] = useAtom(isClick);
  const [query] = useAtom(searchQuery);
  const [, setSelectedRecipe] = useAtom(chooseQuery);

  // 쿼리를 사용하여 데이터를 가져옵니다.
  const {
    data: allRecipes,
    isError,
    isLoading,
  } = useQuery<RecipesRatingExpand[]>({ queryKey: ['recipes'], queryFn: fetchRecipes, staleTime: 1000 * 30 });

  // 검색 결과를 필터링합니다.
  const filteredQuery =
    allRecipes?.filter((recipe) => {
      return recipe.title.includes(query);
    }) ?? [];

  // 선택한 레시피를 상태에 설정합니다.
  const handleSelectRecipe = (selected: RecipesRatingExpand) => {
    const selectedTitle = selected.title.replace(/\s+/g, '');
    console.log(selectedTitle);

    // const selectedCategory = selected.category.replace(/\s+/g, '');

    const filteredData: RecipesRatingExpand[] | undefined = allRecipes?.filter(
      (item) => item.title.replace(/\s+/g, '').includes(query)
      // item.category.replace(/\s+/g, '').includes(selectedCategory)
    );
    if (filteredData) {
      setSelectedRecipe(filteredData);
    }
    sessionStorage.setItem('selectedRecipe', JSON.stringify(filteredData));

    setIsButtonClick(true);
  };

  if (isLoading) return <DefaultLoader />;
  if (isError) return <div>에러 발생!</div>;
  return isButtonClick ? (
    <Result />
  ) : (
    <ul className="py-18pxr text-sub">
      {filteredQuery?.map((item) => (
        <li key={item.id} className="flex flex-col py-10pxr border-b border-gray_150">
          <button type="button" className="w-full text-left" onClick={() => handleSelectRecipe(item)}>
            {item.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

export const SearchQuery = memo(SearchQueryComponent);
