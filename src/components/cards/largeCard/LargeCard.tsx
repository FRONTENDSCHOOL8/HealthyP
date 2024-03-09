import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { RecordModel } from 'pocketbase';
import { RatingsResponse, UsersResponse } from '@/types';
import { Star, Review, Keyword, BookmarkButton } from '@/components';

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

function UserProfile({ profile }: profileProps) {
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
  const handleClick = () => {
    const newRecipe = { title, id };

    // sessionStorage에서 recentRecipe 목록을 가져옴
    const recentRecipesRaw = sessionStorage.getItem('recentRecipe');
    const recentRecipes = recentRecipesRaw ? JSON.parse(recentRecipesRaw) : [];

    // recentRecipes가 배열이 아닌 경우를 처리(예상치 못한 값이 있는 경우)
    if (!Array.isArray(recentRecipes)) {
      sessionStorage.setItem('recentRecipe', JSON.stringify([newRecipe]));
      return;
    }

    // 이미 리스트에 같은 레시피가 있는지 확인
    const existingIndex = recentRecipes.findIndex((r) => r.id === newRecipe.id);

    // 레시피가 이미 존재한다면 기존의 것을 제거
    if (existingIndex !== -1) {
      recentRecipes.splice(existingIndex, 1);
    }

    // 새로운 레시피를 추가
    recentRecipes.push(newRecipe);

    // 레시피 목록이 5개를 넘으면, 가장 오래된 레시피를 제거
    while (recentRecipes.length > 5) {
      recentRecipes.shift();
    }

    // 업데이트된 레시피 목록을 sessionStorage에 저장
    sessionStorage.setItem('recentRecipe', JSON.stringify(recentRecipes));
  };

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
      <Link to={`/detail/${id}`} onClick={handleClick}>
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
