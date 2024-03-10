import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { RecordModel } from "pocketbase";
import { db } from "@/api/pocketbase";
import { FnButton } from "@/components";
import { ReviewCard } from "./components/ReviewCard";
import { Outlet } from "react-router-dom";
import { ReviewStars } from "./components/ReviewStars";


interface RatingsInterface {
  id: string;
  creator: string;
  review_stars: number;
  review_text: string;
  expand: RecordModel;
}

export function ReviewPage() {
  const {recipeId} = useParams();
  const [reviews, setReviews] = useState<RecordModel>();
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecipeData() {
      if (recipeId === undefined) return;
      const record = await db.collection('recipes').getOne(recipeId, {
        expand: 'rating.creator'
      });
      setReviews(record.expand?.rating);
    }
    getRecipeData();
  }, [recipeId])

  return (
    <>
      <main className="w-full h-full px-16pxr flex flex-col items-center">
        <header className="w-full flex justify-end py-12pxr">
          <FnButton image='close' clickHandler={() => navigate(-1)}/>
        </header>
        <div className="flex flex-col gap-20pxr justify-center items-center pt-40pxr w-full">
          <Link to="create" className="w-200pxr h-25pxr">
            <ReviewStars ratingNumber={0} height='' width=''/>
          </Link>
          <p className="text-sub">요리해 보셨다면, 후기를 남겨보세요!</p>
          <ul className="border-b w-full">
            {
              reviews?.map((item : RatingsInterface) => {
                return (
                  <li key={item.id}>
                    <ReviewCard profile={item.expand.creator} reviewText={item.review_text} rating={item.review_stars}/>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </main>
      <Outlet />
    </>
  )
}