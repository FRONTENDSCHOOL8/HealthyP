import { AnimatePresence, motion } from 'framer-motion';
import { ReviewStars } from './components/ReviewStars';
import { TextArea } from '../create/components';
import { PurifiedText } from './components/PurifiedText';
import useCreateReview from '@/hooks/useCreateReview';

export function CreateReview() {
  const { UploadReview, setStars, setReviewText, navigate, imageURL, rangeOfStars, recipeData, stars } =
    useCreateReview();

  return (
    <AnimatePresence>
      <div className="fixed bottom-0 w-full h-full bg-gray_500/70 pb-120pxr z-10">
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
          className="h-full w-full"
        ></button>
        <motion.div
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          exit={{ opacity: 1000 }}
          transition={{ duration: 0.1 }}
          className="absolute bottom-0 bg-white px-17pxr h-4/5 w-full rounded-t-3xl"
        >
          <button className="w-full pt-16pxr pb-50pxr flex justify-center">
            <hr className="h-3pxr w-67pxr bg-gray-200 border-0 rounded-full sticky top-0"></hr>
          </button>
          <div className='w-full h-full pb-160pxr overflow-y-auto'>
            <div className="flex gap-17pxr w-full py-14pxr">
              <img src={imageURL} alt="레시피 사진" className="w-60pxr h-60pxr object-contain rounded-xl" />
              <div className="flex flex-col gap-4pxr">
                <h2 className="text-sub-em">{recipeData?.title}</h2>
                <div className="text-foot line-clamp-1">
                  <PurifiedText textContent={recipeData?.desc} />
                </div>
              </div>
            </div>
            <div className="w-full py-36pxr flex flex-col items-center border-t border-b border-gray-200 gap-14pxr">
              <h2 className="text-body-em">레시피는 어떠셨나요?</h2>
              <div className="w-fit relative">
                <div className="flex gap-2pxr">
                  <ReviewStars ratingNumber={stars} />
                </div>
                <ul className="w-full h-full flex absolute top-0 left-0">
                  {rangeOfStars.map((item: number, idx: number) => (
                    <li className="w-1/5 h-full" key={idx}>
                      <button
                        className="w-full h-full"
                        onClick={() => {
                          setStars(item);
                        }}
                      ></button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full py-36pxr flex flex-col items-center gap-14pxr">
              <h2 className="text-body-em">어떤점이 좋았나요?</h2>
              <TextArea
                maxCharCount={200}
                setData={setReviewText}
                placeholderText="맛, 레시피 정보 등 좋았던 점을 10글자 이상 남겨주세요"
              />
            </div>
          </div>
          <footer className="absolute left-0 bottom-0 w-full flex justify-center px-14pxr gap-8pxr pt-14pxr pb-46pxr bg-white">
            <button
              type="button"
              aria-label="이전"
              className="w-1/3 bg-gray_150 py-12pxr text-gray_700 rounded-[7px] cursor"
              onClick={() => {
                navigate(-1);
              }}
            >
              이전
            </button>
            <button
              type="button"
              aria-label="이전"
              className="w-2/3 bg-primary py-12pxr text-white rounded-[7px] cursor"
              onClick={UploadReview}
            >
              완료
            </button>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
