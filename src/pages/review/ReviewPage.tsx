import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { RecordModel } from "pocketbase";
import { db } from "@/api/pocketbase";
import { FnButton } from "@/components";
import DOMPurify from "dompurify";
import getPbImage from "@/util/data/getPBImage";
import { Outlet } from "react-router-dom";

interface RatingsInterface {
  id: string;
  creator: string;
  review_stars: number;
  review_text: string;
  expand: RecordModel;
}
interface PurifiedTextProps {
  textContent: string;
}
interface ReviewCardProps {
  profile: RecordModel,
  reviewText: string;
  rating: number;
}
interface ReviewStarsProps {
  ratingNumber: number;
  height: string;
  width: string;
}


function PurifiedText({textContent} : PurifiedTextProps) {
  const clearHTML = DOMPurify.sanitize(textContent, {
    ALLOWED_TAGS: ['br', 'em', 'strong', 'p'],
  });
  return (
    <>
      <p className="text-foot" dangerouslySetInnerHTML={{ __html: clearHTML }} />
    </>
  )
}

function ReviewStars({ratingNumber, height, width} : ReviewStarsProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 168 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.8673 24.905C5.24005 25.235 4.5283 24.6567 4.65505 23.9184L6.0038 16.0353L0.278936 10.4422C-0.255687 9.91884 0.0221868 8.9622 0.73881 8.85887L8.69804 7.69891L12.247 0.487484C12.5672 -0.162495 13.4333 -0.162495 13.7534 0.487484L17.3024 7.69891L25.2616 8.85887C25.9782 8.9622 26.2561 9.91884 25.7199 10.4422L19.9966 16.0353L21.3454 23.9184C21.4721 24.6567 20.7604 25.235 20.1331 24.905L12.9978 21.1451L5.8673 24.905Z" fill={ratingNumber >= 1 ? "#f9d200" : "#E7E7E7"}/>
      <path d="M41.093 24.905C40.4416 25.235 39.7025 24.6567 39.8341 23.9184L41.2347 16.0353L35.2897 10.4422C34.7345 9.91884 35.023 8.9622 35.7672 8.85887L44.0326 7.69891L47.7181 0.487484C48.0505 -0.162495 48.9499 -0.162495 49.2824 0.487484L52.9679 7.69891L61.2332 8.85887C61.9774 8.9622 62.266 9.91884 61.7091 10.4422L55.7657 16.0353L57.1664 23.9184C57.298 24.6567 56.5589 25.235 55.9075 24.905L48.4977 21.1451L41.093 24.905Z" fill={ratingNumber >= 2 ? "#f9d200" : "#E7E7E7"}/>
      <path d="M76.8673 24.905C76.24 25.235 75.5283 24.6567 75.655 23.9184L77.0038 16.0353L71.2789 10.4422C70.7443 9.91884 71.0222 8.9622 71.7388 8.85887L79.698 7.69891L83.247 0.487484C83.5672 -0.162495 84.4333 -0.162495 84.7534 0.487484L88.3024 7.69891L96.2616 8.85887C96.9782 8.9622 97.2561 9.91884 96.7199 10.4422L90.9966 16.0353L92.3454 23.9184C92.4721 24.6567 91.7604 25.235 91.1331 24.905L83.9978 21.1451L76.8673 24.905Z" fill={ratingNumber >= 3 ? "#f9d200" : "#E7E7E7"}/>
      <path d="M110.319 24.905C109.643 25.235 108.877 24.6567 109.013 23.9184L110.466 16.0353L104.3 10.4422C103.725 9.91884 104.024 8.9622 104.796 8.85887L113.367 7.69891L117.189 0.487484C117.534 -0.162495 118.467 -0.162495 118.811 0.487484L122.633 7.69891L131.205 8.85887C131.977 8.9622 132.276 9.91884 131.698 10.4422L125.535 16.0353L126.987 23.9184C127.124 24.6567 126.357 25.235 125.682 24.905L117.998 21.1451L110.319 24.905Z" fill={ratingNumber >= 4 ? "#f9d200" : "#E7E7E7"}/>
      <path d="M146.319 24.905C145.643 25.235 144.877 24.6567 145.013 23.9184L146.466 16.0353L140.3 10.4422C139.725 9.91884 140.024 8.9622 140.796 8.85887L149.367 7.69891L153.189 0.487484C153.534 -0.162495 154.467 -0.162495 154.811 0.487484L158.633 7.69891L167.205 8.85887C167.977 8.9622 168.276 9.91884 167.698 10.4422L161.535 16.0353L162.987 23.9184C163.124 24.6567 162.357 25.235 161.682 24.905L153.998 21.1451L146.319 24.905Z" fill={ratingNumber >= 5 ? "#f9d200" : "#E7E7E7"}/>
    </svg>
  )
}

function ReviewCard({profile, reviewText, rating} : ReviewCardProps) {
  const url = getPbImage('users', profile.id, profile.avatar)
  return (
    <div className="flex gap-8pxr border-t pt-12pxr pb-16pxr">
      <img src={url} alt="프로필사진" className="size-30pxr bg-gray_400 rounded-[30px]"/>
      <div className="flex flex-col gap-6pxr">
        <div className="flex items-center gap-8pxr height-fit">
          <h3 className="text-foot-em flex gap-4pxr items-center">{profile.name}</h3>
          <ReviewStars ratingNumber={rating} height="" width="80px"/>
        </div>
        <PurifiedText textContent={reviewText} />
      </div>
    </div>
  )
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
          <button type='button' className="w-200pxr h-25pxr">
            <ReviewStars ratingNumber={0} height='' width=''/>
          </button>
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