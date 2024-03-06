import { Rating } from '@/types';
import Review from '../../review/Review';
import Star from '../../star/Star';
import { Link } from 'react-router-dom';
export type RecipeCardProps = {
  title: string;
  url: string;
  rating: Rating[];
  id: string;
};

export default function RecipeCard({ title, url, rating, id }: RecipeCardProps) {

  

  return (
    <Link to={`/detail/${id}`} className="w-136pxr min-h-181pxr overflow-hidden shrink-0">
      <img
        className="aspect-square object-cover w-full  rounded-[5px]"
        src={url}
        alt=""
      />
      <h3 className="px-2pxr text-sub-em mt-5pxr mb-2pxr">{title}</h3>
      <div className="flex px-2pxr" aria-label="리뷰 버튼">
        <Star rating={rating} />
        <Review rating={rating} caseType={'number'} />
      </div>
    </Link>
  );
}
