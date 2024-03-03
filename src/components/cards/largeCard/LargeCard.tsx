import { Rating } from '@/types';
import Review from '../../review/Review';
import Star from '../../star/Star';

export interface LargeCardProps {
  title: string;
  type: 'bookmark' | 'myRecipe';
  url: string;
  keywords?: string;
  rating: Rating[];
}

export default function LargeCard({
  type,
  keywords,
  title,
  url,
  rating,
}: LargeCardProps) {
  return (
    <article className="min-w-full min-h-181pxr overflow-hidden shrink-0">
      <img className="object-cover w-full rounded-[5px]" src={url} alt="" />
      <h3 className="text-sub-em">{title}</h3>
      <div className="flex px-2pxr">
        <Star rating={rating} />
        <Review rating={rating} caseType={'number'} />
      </div>
    </article>
  );
}
