import { RatingsResponse } from '@/types';

interface ReviewProps {
  rating: RatingsResponse[];
  caseType: 'literal' | 'number';
}

const renderTextMap = {
  literal: (count: number) => `리뷰 ${count}개 >`,
  number: (count: number) => `(${count > 100 ? '100+' : count})`,
};

function Review({ rating = [], caseType }: ReviewProps) {
  const count: number = rating.length ?? 0;
  const renderText = renderTextMap[caseType](count);
  return (
    <>
      <p className="text-foot ">{renderText}</p>
    </>
  );
}

export default Review;
