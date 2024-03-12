import { RatingsResponse } from '@/types';
import arrow from '@/assets/icons/arrowBig.svg';
import { Helmet } from 'react-helmet-async';

interface ReviewProps {
  rating: RatingsResponse[];
  caseType: 'literal' | 'number';
}

const renderTextMap = {
  literal: (count: number) => `리뷰 ${count}개`,
  number: (count: number) => `(${count > 100 ? '100+' : count})`,
};

function Review({ rating = [], caseType }: ReviewProps) {
  const count: number = rating.length ?? 0;
  const renderText = renderTextMap[caseType](count);
  return (
    <>
      <Helmet>
        <title>HealthyP | 리뷰</title>
      </Helmet>
      <div className="flex items-center justify-center">
        <p className="text-sub pr-4pxr">{renderText}</p>
        {caseType === 'literal' && (
          <img src={arrow} alt="더보기" className="size-14pxr rotate-180" />
        )}
      </div>
    </>
  );
}

export default Review;
