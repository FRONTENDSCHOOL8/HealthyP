import DOMPurify from 'dompurify';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailInfo } from '@/hooks/useDetailInfo';
import { AccordionList } from './components/DetailComponents';
import { Star, Review, FnButton, BookmarkButton, Keyword } from '@/components';

export function DetailPage() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { recipeData, imageURL, userData } = useDetailInfo(recipeId);

  const clearText = useMemo(
    () =>
      DOMPurify.sanitize(recipeData?.desc, {
        ALLOWED_TAGS: ['p', 'em', 'br'],
      }),
    [recipeData?.desc]
  );

  if (!recipeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-full">
      <motion.header className="w-full max-w-1300pxr px-10pxr py-12pxr flex items-center justify-between z-10 fixed">
        <FnButton image={'arrowBig'} clickHandler={() => navigate(-1)} />
        <BookmarkButton recipeId={recipeId} userData={userData} />
      </motion.header>
      <img className="fixed top-0 w-full max-w-1300pxr max-h-365pxr object-cover object-center" src={imageURL} alt="" />
      <div className="absolute top-[32vh] shadow-revert w-full flex flex-col pt-18pxr min-h-svh pb-82pxr bg-white">
        <div className="px-14pxr">
          <Keyword items={recipeData.keywords} />
          <h1 className="text-title-2-em mt-20pxr mb-9pxr">{recipeData?.title}</h1>
          <p className="text-sub text-gray_700" dangerouslySetInnerHTML={{ __html: clearText }}></p>
        </div>
        <div className="flex px-14pxr pb-70pxr pt-30pxr">
          <Star rating={recipeData.expand?.rating} />
          <Review rating={recipeData.expand?.rating} caseType={'literal'} />
        </div>
        {/* 재료, 양념, 영양정보 아코디언 박스 */}
        <div>
          <AccordionList data={recipeData} title="재료" type="ingredients" first />
          <AccordionList data={recipeData} title="양념" type="seasoning" />
          <AccordionList data={recipeData} title="영양정보" type="seasoning" />
        </div>
      </div>
      {/* 시작하기 버튼 */}
    </div>
  );
}


