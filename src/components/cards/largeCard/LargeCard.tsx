import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { RecordModel } from 'pocketbase';
import { RatingsResponse, UsersResponse } from '@/types';
import { Star, Review, BookmarkButton } from '@/components';

// 기본 이미지 파일
import getPbImage from '@/util/data/getPBImage';
import foodDefaultImg from '@/assets/images/flower3.jpg';
import { OverflowCheckComponent } from '@/components/keyword/Keword';

interface profileProps {
  profile?: UsersResponse;
  profileImg?: string;
}
export interface LargeCardProps extends profileProps {
  title: string;
  type?: 'bookmark' | 'myRecipe';
  url: string | null;
  keywords?: string;
  desc: string;
  rating: RatingsResponse[];
  id: string;
  userData: RecordModel | undefined;
}

export function UserProfile({ profile }: profileProps) {
  if (profile === undefined) return;
  const url = getPbImage('_pb_users_auth_', profile.id, profile.avatar);

  return (
    <>
      <img src={url} alt="" className="size-30pxr bg-gray_400 rounded-[30px]" />
      <p className="ml-4pxr mr-auto text-sub-em">{profile.name}</p>
    </>
  );
}

/**
 * 북마크, 나의 레시피 카드 컴포넌트
 */
export default function LargeCard({
  title,
  url = null,
  rating,
  desc,
  id,
  profile,
  keywords,
  userData,
}: LargeCardProps) {
  const clearHTML = DOMPurify.sanitize(desc, {
    ALLOWED_TAGS: ['br', 'em', 'strong'],
  });

  return (
    <article className="h-max overflow-hidden p-14pxr bg-white max-w-430pxr shrink-0 shadow-default">
      {profile && (
        <div className="flex justify-between min-h-54pxr items-center">
          <UserProfile profile={profile} />
          <BookmarkButton userData={userData} recipeId={id} />
        </div>
      )}
      <Link to={`/detail/${id}`}>
        <img
          className="aspect-video object-cover w-full rounded-[5px] bg-gray_100"
          src={url || foodDefaultImg}
          alt=""
        />
        {/* 이거 키워드 어캄 슈발 */}
        {/* <Keyword items={keywords} /> */}
        <OverflowCheckComponent items={keywords} />
        <h3 className="text-title-3-em mt-18pxr">{title}</h3>
        <p
          className="w-full py-4pxr text-sub text-gray_700 line-clamp-2 h-44pxr"
          dangerouslySetInnerHTML={{ __html: clearHTML }}
        />
      </Link>
      <div className="flex px-2pxr pt-20pxr pb-36pxr gap-4pxr items-center">
        <Link to={'/'} className="fit-content flex gap-4pxr">
          <Star rating={rating} />
          <Review rating={rating} caseType={'literal'} />
        </Link>
      </div>
    </article>
  );
}
