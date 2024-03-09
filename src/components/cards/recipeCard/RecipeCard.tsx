import { RatingsResponse } from '@/types';
import Review from '../../review/Review';
import Star from '../../star/Star';
import { Link } from 'react-router-dom';

export type RecipeCardProps = {
  title: string;
  url: string;
  rating: RatingsResponse[];
  id: string;
};

export default function RecipeCard({ title, url, rating, id }: RecipeCardProps) {
  const handleClick = () => {
    const newRecipe = { title, id };

    // sessionStorage에서 recentRecipe 목록을 가져옴
    const recentRecipesRaw = sessionStorage.getItem('recentRecipe');
    const recentRecipes = recentRecipesRaw ? JSON.parse(recentRecipesRaw) : [];

    // recentRecipes가 배열이 아닌 경우를 처리(예상치 못한 값이 있는 경우)
    if (!Array.isArray(recentRecipes)) {
      sessionStorage.setItem('recentRecipe', JSON.stringify([newRecipe]));
      return;
    }

    // 이미 리스트에 같은 레시피가 있는지 확인
    const existingIndex = recentRecipes.findIndex((r) => r.id === newRecipe.id);

    // 레시피가 이미 존재한다면 기존의 것을 제거
    if (existingIndex !== -1) {
      recentRecipes.splice(existingIndex, 1);
    }

    // 새로운 레시피를 추가
    recentRecipes.push(newRecipe);

    // 레시피 목록이 5개를 넘으면, 가장 오래된 레시피를 제거
    while (recentRecipes.length > 5) {
      recentRecipes.shift();
    }

    // 업데이트된 레시피 목록을 sessionStorage에 저장
    sessionStorage.setItem('recentRecipe', JSON.stringify(recentRecipes));
  };

  return (
    <Link to={`/detail/${id}`} className="w-136pxr min-h-181pxr overflow-hidden shrink-0" onClick={handleClick}>
      <img className="aspect-square object-cover w-full  rounded-[5px]" src={url} alt="" />
      <h3 className="px-2pxr text-sub-em mt-5pxr mb-2pxr">{title}</h3>
      <div className="flex px-2pxr" aria-label="리뷰 버튼">
        <Star rating={rating} />
        <Review rating={rating} caseType={'number'} />
      </div>
    </Link>
  );
}
