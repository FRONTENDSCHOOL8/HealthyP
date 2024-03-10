import getPbImage from '@/util/data/getPBImage';
import { RecordModel } from 'pocketbase';
import { ReviewStars } from './ReviewStars';
import { PurifiedText } from './PurifiedText';
import { ReviewStars2 } from './ReviewStars2';

interface ReviewCardProps {
  profile: RecordModel;
  reviewText: string;
  rating: number;
}
export function ReviewCard({ profile, reviewText, rating }: ReviewCardProps) {
  const url = getPbImage('users', profile.id, profile.avatar);
  return (
    <div className="flex gap-8pxr border-t pt-12pxr pb-16pxr">
      <img src={url} alt="프로필사진" className="size-30pxr bg-gray_400 rounded-[30px]" />
      <div className="flex flex-col gap-6pxr">
        <div className="flex items-center gap-8pxr height-fit">
          <h3 className="text-foot-em flex gap-4pxr items-center">{profile.name}</h3>
          {/* <ReviewStars ratingNumber={rating} height="" width="80px"/> */}
          <div className="flex gap-4pxr">
            <ReviewStars2 ratingNumber={rating} height="8px" width="8px" />
          </div>
        </div>
        <PurifiedText textContent={reviewText} />
      </div>
    </div>
  );
}
