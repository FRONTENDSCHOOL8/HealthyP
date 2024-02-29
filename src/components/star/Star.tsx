import { Rating } from '@/types';

export default function Star({ rating }: { rating: Rating[] }) {
  // data가 불러온 레시피들 리스트 중 하나만 가져오게

  const getStarCount = () => {
    const total = rating.reduce((acc, cur) => acc + cur.review_stars, 0);
    return (total / rating.length / 2).toFixed(1) + '점';
  };

  return (
    <div className="flex text-cap-1-em gap-2pxr">
      <span className="bg-star-icon size-14pxr" aria-hidden></span>
      <p>{getStarCount()}</p>
    </div>
  );
}
