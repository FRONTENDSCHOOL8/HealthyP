import { useAtom } from 'jotai';
import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { searchQuery, chooseQuery } from '@/stores/stores';
import { db } from '@/api/pocketbase';
import { RecipesExpand } from '@/types';

// 쿼리 구독을 위한 함수
async function fetchRecipes() {
  const response = await db.collection('recipes').getFullList<RecipesExpand>({ expand: 'rating' });
  return response;
}

// 캐싱된 데이터를 사용하여 검색 결과를 보여주는 컴포넌트
function SearchQueryComponent() {
  const [query] = useAtom(searchQuery);
  const [, setSelectedRecipe] = useAtom(chooseQuery);
  const navigate = useNavigate();

  // 쿼리를 사용하여 데이터를 가져옵니다.
  const {
    data: allRecipes,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['recipes'], queryFn: fetchRecipes, staleTime: 1000 * 30 });

  // 검색 결과를 필터링합니다.
  const filteredQuery = allRecipes?.filter((recipe) => {
    return recipe.title.includes(query) || recipe.keywords.includes(query);
  });

  // 선택한 레시피를 상태에 설정합니다.
  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    navigate('/search/result');
  };

  if (isLoading) return <div>검색중입니다...</div>;
  if (isError) return <div>에러 발생!</div>;

  return (
    <ul className="py-18pxr px-14pxr text-sub">
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
