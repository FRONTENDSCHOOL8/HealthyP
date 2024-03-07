
import { useNavigate, useParams } from "react-router-dom"
import {Star, Review, FnButton, BookmarkButton} from "@/components";
import DOMPurify from "dompurify";
import arrowBig from '@/assets/icons/arrowBig.svg';
import { Ingredients, Seasoning, Nutrition } from "./components/DetailComponents";
import { useDetailInfo } from "@/hooks/useDetailInfo";


export function DetailPage() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const {recipeData, imageURL, headerBg, userData} = useDetailInfo(recipeId);
  if (!recipeData) {
    return <div>Loading...</div>;
  }
  const clearText = DOMPurify.sanitize(recipeData?.desc, {
    ALLOWED_TAGS: ['p', 'em', 'br'],
  });

  return (
    <div className="relative">
      <header className={`w-full ${headerBg} px-10pxr py-12pxr flex items-center justify-between z-10 fixed`}>
        <FnButton image={arrowBig} clickHandler={() => navigate(-1)} />
        <BookmarkButton recipeId={recipeId} userData={userData}/>
      </header>
      <img src={imageURL} alt="" className="w-full max-h-365pxr object-cover" />
      <div className="flex flex-col gap-20pxr py-20pxr bg-white">
        <div className="px-14pxr flex flex-col gap-8pxr">
          <h1 className="text-title-2-em">{recipeData?.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: clearText }}></p>
        </div>
        <div className="flex px-14pxr">
          <Star rating={recipeData.expand?.rating} />
          <Review rating={recipeData.expand?.rating} caseType={'number'} />
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
