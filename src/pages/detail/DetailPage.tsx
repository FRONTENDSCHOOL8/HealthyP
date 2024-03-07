
import { useNavigate, useParams } from "react-router-dom"
import { db } from "@/api/pocketbase";
import { useEffect, useState } from "react";
import { RecordModel } from "pocketbase";
import {Star, Review, FnButton, BookmarkButton} from "@/components";
import DOMPurify from "dompurify";
import arrowBig from '@/assets/icons/arrowBig.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import bookmarkFill from '@/assets/icons/bookmarkFill.svg';
import { Ingredients, Seasoning, Nutrition } from "./components/DetailComponents";


export function DetailPage() {
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState<RecordModel>();
  const [imageURL, setImageURL] = useState('');
  const [headerBg, setHeaderBg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecipeData() {
      if (recipeId === undefined) return;
      const record = await db.collection('recipes').getOne(recipeId, {
        expand: 'rating',
      });
      const url = db.files.getUrl(record, record.image);
      setImageURL(url);
      setRecipeData(record);
    }
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const threshold = 100;
      if (scrollPosition > threshold) {
        setHeaderBg('bg-white');
      } else {
        setHeaderBg('bg-none');
      }
    }
    getRecipeData();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      db.collection('users').unsubscribe();
    };
  }, [recipeId]);
  if (!recipeData) {
    return <div>Loading...</div>;
  }
  const clearText = DOMPurify.sanitize(recipeData?.desc, {
    ALLOWED_TAGS: ['p', 'em', 'br'],
  });


  return (
    <div className="relative">
      <header
        className={`w-full ${headerBg} px-10pxr py-12pxr flex items-center justify-between z-10 fixed`}
      >
        <FnButton image={arrowBig} clickHandler={() => navigate(-1)} />
        <BookmarkButton inactiveImage={bookmark} activeImage={bookmarkFill} recipeId={recipeId}/>

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
