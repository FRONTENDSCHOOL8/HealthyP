import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import image from "@/assets/images/flower3.jpg";
import { ReviewStars } from "./components/ReviewStars";
import { useEffect, useState } from "react";
import { TextAreaComponent } from "../create/components";
import { db } from "@/api/pocketbase";
import { getCurrentUserData } from "@/util";
import { RecordModel } from "pocketbase";
import getPbImage from "@/util/data/getPBImage";
import { PurifiedText } from "./components/PurifiedText";

export function CreateReview() {
  const {recipeId} = useParams();
  const navigate = useNavigate();
  const [stars, setStars] = useState(0);
  const [recipeData, setRecipeData] = useState<RecordModel>();
  const [reviewText, setReviewText] = useState('');
  const currentUserId = getCurrentUserData().id;
  const [imageURL, setImageURL] = useState(''); 

  useEffect(() => {
    async function getRecipeData() {
      if(recipeId === undefined) return;
      const record = await db.collection('recipes').getOne(recipeId);
      setRecipeData(record);
      setImageURL(getPbImage('recipes', recipeId, record.image));
    }

    getRecipeData();
  }, [recipeId])

  async function UploadReview() {
    const reviewData = {
      "creator": currentUserId,
      "review_stars": stars,
      "review_text": reviewText
    }
    const record = await db.collection('ratings').create(reviewData)

    if(recipeId === undefined || recipeData === undefined) return;
    const updatedRatings = { "rating": [...recipeData.rating, record.id] }
    await db.collection('recipes').update(recipeId, updatedRatings);
    navigate(`/detail/${recipeId}`);
  }

  return (
    <AnimatePresence>
      <div className="fixed bottom-0 w-full h-full bg-gray_500/70">
        <button type="button" onClick={() => {navigate(-1)}} className="h-full w-full"></button>
        <motion.div 
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          exit={{ opacity: 1000 }}
          transition={{ duration: .1  }}
          className="absolute bottom-0 bg-white px-17pxr h-4/5 w-full rounded-t-3xl">
          <button className="w-full pt-16pxr pb-50pxr flex justify-center">
            <hr className="h-3pxr w-67pxr bg-gray-200 border-0 rounded-full"></hr>
          </button>
          <div className="flex gap-17pxr w-full py-14pxr">
            <img src={imageURL} alt="레시피 사진" className="w-60pxr h-60pxr object-contain rounded-xl" />
            <div className="flex flex-col gap-4pxr">
              <h2 className="text-sub-em">{recipeData?.title}</h2>
              <p className="text-foot line-clamp-1">
                <PurifiedText textContent={recipeData?.desc} />
              </p>
            </div>
          </div>
          <div className="w-full py-36pxr flex flex-col items-center border-t border-b border-gray-200 gap-14pxr">
            <h2 className="text-body-em">레시피는 어떠셨나요?</h2>
            <div className="w-fit relative">
              <ReviewStars ratingNumber={stars} height='25px' width='168px'/>
              <div className="w-full h-full flex absolute top-0 left-0">
                <button className="w-1/5 h-full" onClick={() => {setStars(1)}}></button>
                <button className="w-1/5 h-full" onClick={() => {setStars(2)}}></button>
                <button className="w-1/5 h-full" onClick={() => {setStars(3)}}></button>
                <button className="w-1/5 h-full" onClick={() => {setStars(4)}}></button>
                <button className="w-1/5 h-full" onClick={() => {setStars(5)}}></button>
              </div>
            </div>
          </div>
          <div className="w-full py-36pxr flex flex-col items-center gap-14pxr">
            <h2 className="text-body-em">어떤점이 좋았나요?</h2>
            <TextAreaComponent maxCharCount={200} setData={setReviewText} placeholderText="맛, 레시피 정보 등 좋았던 점을 10글자 이상 남겨주세요" />
          </div>
          <footer className="absolute left-0 bottom-0 w-full flex justify-center px-14pxr gap-8pxr pt-14pxr pb-46pxr">
            <button 
              type="button" 
              aria-label="이전" 
              className="w-1/3 bg-gray_150 py-12pxr text-gray_700 rounded-[7px] cursor"
              onClick={() => {navigate(-1)}}>이전
            </button>
            <button 
              type="button" 
              aria-label="이전" 
              className="w-2/3 bg-primary py-12pxr text-white rounded-[7px] cursor"
              onClick={UploadReview}>완료
            </button>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}