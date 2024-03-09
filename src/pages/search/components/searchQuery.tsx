import { useAtom } from 'jotai';
import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { searchQuery, chooseQuery } from '@/stores/stores';
import { db } from '@/api/pocketbase';
import { RecipesExpand } from '@/types';

async function fetchRecipes() {
  const response = await db
    .collection('recipes')
    .getFullList<RecipesExpand>({ expand: 'rating' });
  return response;
}

function SearchQueryComponent() {
  const [query] = useAtom(searchQuery);
  const [, setSelectedRecipe] = useAtom(chooseQuery);
  const navigate = useNavigate();

  const {
    data: allRecipes,
    isError,
    isLoading,
  } = useQuery(['recipes'], fetchRecipes);

  const filteredQuery = allRecipes.filter((recipe) => {
    return (
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.keywords.toLowerCase().includes(query.toLowerCase())
    );
  });

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    navigate('/search/result');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred</div>;

  return (
    <ul className="py-18pxr px-14pxr text-sub">
      {filteredQuery?.map((item) => (
        <li
          key={item.id}
          className="flex flex-col py-10pxr border-b border-gray_150"
        >
          <button
            type="button"
            className="w-full text-left"
            onClick={() => handleSelectRecipe(item)}
          >
            {item.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

export const SearchQuery = memo(SearchQueryComponent);
