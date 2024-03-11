import { RatingsResponse } from '@/types';

interface ReviewProps {
  rating: RatingsResponse[] | undefined;
}

export default function Star({ rating }: ReviewProps) {
  // data가 불러온 레시피들 리스트 중 하나만 가져오게

  const getStarCount = () => {
    if (rating?.length === 0) {
      rating = undefined;
    }

    if (rating) {
      const total = rating.reduce((acc, cur) => acc + cur.review_stars, 0);
      return (total / rating.length).toFixed(1) + '점';
    } else return '-점';
  };

  return (
    <span className="flex text-sub-em gap-2pxr items-center pr-8pxr">
      <span className="bg-star-icon size-16pxr bg-cover" aria-hidden></span>
      <p>{getStarCount()}</p>
    </span>
  );
}
