import { Rating } from '@/types';
import Review from '../../review/Review';
import Star from '../../star/Star';
import { FnButton } from '@/components';
import bookmark from '@/assets/icons/bookmark.svg';
import DOMPurify from 'dompurify';
import img from '@/assets/images/flower3.jpg';
import { Link } from 'react-router-dom';
import profileDefaultImg from '@/assets/images/medal_gold.png';

export interface LargeCardProps {
  title: string;
  type: 'bookmark' | 'myRecipe';
  url: string;
  keywords?: string;
  desc: string;
  rating: Rating[];
  id: string;
}

function BookmarkHeader({ profile, profileImg }) {
  console.log(profile);
  return (
    <div className="flex justify-between min-h-54pxr items-center">
      <span
        src={profileImg}
        alt=""
        className="size-24pxr bg-gray_400 rounded-[12px]"
      />
      <p className="ml-4pxr mr-auto text-foot-em">{profile.name}</p>

      <FnButton image={bookmark} altText="북마크" size={48} />
    </div>
  );
}

export default function LargeCard({
  title,
  url,
  rating,
  desc,
  id,
  profile,
  profileImg,
}: LargeCardProps) {
  const clearHTML = DOMPurify.sanitize(desc, {
    // ALLOWED_ATTR: ['style', 'class', 'type', 'href', 'rel'],
    ALLOWED_TAGS: ['br', 'em', 'strong'],
    // RETURN_DOM: true,
    // must add these tag manually if use this option.
  });
  return (
    <article className="h-max overflow-hidden p-14pxr bg-white max-w-400pxr shrink-0 shadow-default">
      <BookmarkHeader profile={profile} profileImg={profileImg} />
      <img
        className="aspect-video object-cover w-full rounded-[5px] bg-gray_100"
        src={url || img}
        alt=""
      />
      <Link to={'#' + id}>
        <h3 className="text-title-3-em mt-19pxr">{title}</h3>
        <p
          className="w-full py-4pxr text-sub text-gray_700 line-clamp-2 leading-normal"
          dangerouslySetInnerHTML={{ __html: clearHTML }}
        />
      </Link>
      <button className="flex px-2pxr pt-16pxr pb-40pxr gap-4pxr items-center">
        <Star rating={rating} />
        <Review rating={rating} caseType={'literal'} />
      </button>
    </article>
  );
}
