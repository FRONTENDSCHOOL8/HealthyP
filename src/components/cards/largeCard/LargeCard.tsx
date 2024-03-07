import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { RecordModel } from 'pocketbase';
import { RatingsResponse, UsersResponse } from '@/types';
import { Star, Review, Keyword, BookmarkButton } from '@/components';

// 기본 이미지 파일
import getPbImage from '@/util/data/getPBImage';
import foodDefaultImg from '@/assets/images/flower3.jpg';

interface profileProps {
  profile: UsersResponse;
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

function UserProfile({ profile }: profileProps) {
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
    // ALLOWED_ATTR: ['style', 'class', 'type', 'href', 'rel'],
    ALLOWED_TAGS: ['br', 'em', 'strong'],
    // RETURN_DOM: true,
    // must add these tag manually if use this option.
  });

  return (
    <article className="h-max overflow-hidden p-14pxr bg-white max-w-430pxr shrink-0 shadow-default">
      <div className="flex justify-between min-h-54pxr items-center">
        <UserProfile profile={profile} />
        <BookmarkButton userData={userData} recipeId={id} />
      </div>
      <Link to={`/detail/${id}`}>
        <img
          className="aspect-video object-cover w-full rounded-[5px] bg-gray_100"
          src={url || foodDefaultImg}
          alt=""
        />
        <Keyword items={keywords} />
        <h3 className="text-title-3-em mt-19pxr">{title}</h3>
        <p
          className="w-full py-4pxr text-sub text-gray_700 line-clamp-2 min-h-52pxr leading-normal"
          dangerouslySetInnerHTML={{ __html: clearHTML }}
        />
        <div className="flex px-2pxr pt-16pxr pb-40pxr gap-4pxr items-center">
          <Star rating={rating} />
          <Review rating={rating} caseType={'literal'} />
        </div>
      </Link>
    </article>
  );
}
