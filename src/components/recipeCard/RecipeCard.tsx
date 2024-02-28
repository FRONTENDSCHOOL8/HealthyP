import Review from '../reviews/Review';
import Star from '../star/Star';

export type RecipeCardProps = {
  title: string;
  url: string;
  rating: [];
};

export default function RecipeCard({ title, url, rating }: RecipeCardProps) {
  return (
    <article className="w-136pxr h-181pxr shrink-0">
      <img className="aspect-square w-full rounded-[5px]" src={url} alt="" />
      <h3 className="px-2pxr text-sub-em mt-5pxr mb-2pxr">{title}</h3>
      <div className="flex px-2pxr">
        <Star rating={rating} />
        <Review rating={rating} caseType={'number'} />
      </div>
    </article>
  );
}
