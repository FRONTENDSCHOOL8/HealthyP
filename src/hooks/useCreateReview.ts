import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RecordModel } from "pocketbase";
import { db } from "@/api/pocketbase";
import { getCurrentUserData } from "@/util";
import { getRangeArray } from "@/util";
import getPbImage from "@/util/data/getPBImage";

export default function useCreateReview() {
  const {recipeId} = useParams();
  const navigate = useNavigate();
  const [stars, setStars] = useState(0);
  const [recipeData, setRecipeData] = useState<RecordModel>();
  const [reviewText, setReviewText] = useState('');
  const currentUserId = getCurrentUserData().id;
  const [imageURL, setImageURL] = useState(''); 
  const rangeOfStars = getRangeArray(1,6);

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

  return { UploadReview, setStars, setReviewText, navigate, imageURL, rangeOfStars, recipeData, stars }
}