import DOMPurify from 'dompurify';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDetailInfo } from '@/hooks/useDetailInfo';
import { AccordionList, FakeList } from './components/DetailComponents';
import { Star, Review, FnButton, BookmarkButton, Keyword } from '@/components';

const dummyData = [
  { name: '감자', amount: '500g(약 3개)' },
  { name: '고구마', amount: '400g(약 2개 반)' },
  { name: '우유', amount: '1리터' },
  { name: '아스파라거스', amount: '2개' },
  { name: '닭찌찌', amount: '3개' },
];

export function DetailPage() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const isLogin = localStorage.getItem('pocketbase_auth');

  const { recipeData, imageURL, userData } = useDetailInfo(recipeId);

  const clearText = useMemo(
    () =>
      DOMPurify.sanitize(recipeData?.desc, {
        ALLOWED_TAGS: ['p', 'em', 'br'],
      }),
    [recipeData?.desc]
  );

  if (!recipeData) {
    // 스켈레톤 추가하기
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-full">
      <motion.header className="w-full max-w-1300pxr px-10pxr py-12pxr flex items-center justify-between z-10 fixed">
        <FnButton image={'arrowBig'} clickHandler={() => navigate(-1)} />
        <BookmarkButton recipeId={recipeId} userData={userData} />
      </motion.header>
      <img className="fixed top-0 w-full max-w-1300pxr max-h-365pxr object-cover object-center" src={imageURL} alt="" />
      <div className="absolute top-[32vh] shadow-revert w-full flex flex-col pt-18pxr min-h-svh pb-120pxr bg-white">
        <div className="px-14pxr">
          <Keyword items={recipeData.keywords} />
          <h1 className="text-title-2-em mt-20pxr mb-9pxr">{recipeData?.title}</h1>
          <p className="text-sub text-gray_700" dangerouslySetInnerHTML={{ __html: clearText }}></p>
        </div>
        <Link to={`/reviews/${recipeId}`} className="flex px-14pxr pb-70pxr pt-30pxr">
          <Star rating={recipeData.expand?.rating} />
          <Review rating={recipeData.expand?.rating} caseType={'literal'} />
        </Link>

        {/* 재료, 양념, 영양정보 아코디언 박스 */}
        <div>
          {isLogin ? (
            <>
              <AccordionList data={recipeData} title="재료" type="ingredients" first />
              <AccordionList data={recipeData} title="양념" type="seasoning" />
              <AccordionList data={recipeData} title="영양정보" type="nutrition" />
            </>
          ) : (
            <>
              <FakeList data={dummyData} title="재료" first />
              <FakeList data={dummyData} title="양념" />
              <FakeList data={dummyData} title="영양정보" />
            </>
          )}
        </div>
      </div>
      <div className="mt-auto py-14pxr px-14pxr bg-white fixed bottom-0 w-full max-w-1300pxr">
        <Link
          to={isLogin ? `/detail/${recipeId}/steps` : '/login'}
          className="w-full text-center block py-12pxr rounded-[7px] bg-primary text-white text-body-em"
        >
          {isLogin ? '시작하기' : '로그인하러가기'}
        </Link>
      </div>
    </div>
  );
}
