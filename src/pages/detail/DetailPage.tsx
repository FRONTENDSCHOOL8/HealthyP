import { useNavigate, useParams } from 'react-router-dom';
import { Star, Review, FnButton, BookmarkButton, Keyword } from '@/components';
import DOMPurify from 'dompurify';
import {
  Ingredients,
  Seasoning,
  Nutrition,
} from './components/DetailComponents';
import { useDetailInfo } from '@/hooks/useDetailInfo';

export function DetailPage() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { recipeData, imageURL, headerBg, userData } = useDetailInfo(recipeId);
  if (!recipeData) {
    return <div>Loading...</div>;
  }
  const clearText = DOMPurify.sanitize(recipeData?.desc, {
    ALLOWED_TAGS: ['p', 'em', 'br'],
  });

  return (
    <div className="relative h-full">
      <header
        className={`w-full ${headerBg} px-10pxr py-12pxr flex items-center justify-between z-10 fixed`}
      >
        <FnButton image={'arrowBig'} clickHandler={() => navigate(-1)} />
        <BookmarkButton recipeId={recipeId} userData={userData} />
      </header>
      <img
        src={imageURL}
        alt=""
        className="fixed top-0 w-full max-h-365pxr object-cover object-center"
      />
      <div className="absolute top-320pxr shadow-revert w-full flex flex-col pt-24pxr min-h-700pxr pb-82pxr bg-white">
        <div className="px-14pxr">
          <Keyword items={recipeData.keywords} />
          <h1 className="text-title-2-em mt-24pxr mb-4pxr">
            {recipeData?.title}
          </h1>
          <p
            className="text-sub text-gray_700 "
            dangerouslySetInnerHTML={{ __html: clearText }}
          ></p>
        </div>
        <div className="flex px-14pxr mt-32pxr mb-72pxr">
          <Star rating={recipeData.expand?.rating} />
          <Review rating={recipeData.expand?.rating} caseType={'literal'} />
        </div>
        <div>
          <Ingredients data={recipeData} />
          <Seasoning data={recipeData} />
          <Nutrition data={recipeData} />
        </div>
      </div>
    </div>
  );
}
