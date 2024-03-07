import { Header } from "@/components"
import { useParams } from "react-router-dom"
import { db } from "@/api/pocketbase";
import { useEffect, useState } from "react";
import { RecordModel } from "pocketbase";
import {Star, Review} from "@/components";
import DOMPurify from "dompurify";

interface IngredientData {
  name: string;
  amount: string;
}

export function DetailPage() {
  const {recipeId} = useParams();
  const [recipeData, setRecipeData] = useState<RecordModel>();
  const [imageURL, setImageURL] = useState('');
  const [headerBg, setHeaderBg] = useState('');
  
  useEffect(() => {
    async function getRecipeData() {
      if(recipeId === undefined) return;
      const record = await db.collection("recipes_duplicate").getOne(recipeId, {
        expand: 'rating'
      });
      const url = db.files.getUrl(record, record.image);
      setImageURL(url);
      setRecipeData(record);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 100;

      if (scrollPosition > threshold) {
        setHeaderBg('bg-white');
      } else {
        setHeaderBg('mix-blend-exclusion');
      }
    };
    window.addEventListener('scroll', handleScroll);
    getRecipeData();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [recipeId])

  if (!recipeData) {
    return <div>Loading...</div>
  }
  const clearText = DOMPurify.sanitize(recipeData?.desc, {ALLOWED_TAGS: ['p', 'em', 'br']});

  return (
    <div className="z-[1] relative">
      <div className="fixed w-full z-10">
        <Header option="prevWithBookMark"  bgColor={headerBg}/>
      </div>
      <img src={imageURL} alt="" className="w-full max-h-365pxr object-cover sticky top-0 z-0"/>
      <div className="flex flex-col gap-20pxr py-20pxr bg-white z-10">
        <div className="px-14pxr flex flex-col gap-8pxr">
          <h1 className="text-title-2-em">{recipeData?.title}</h1>
          <p dangerouslySetInnerHTML={{__html: clearText}}></p>
        </div>
        <div className="flex px-14pxr">
          <Star rating={recipeData.expand?.review}/>
          <Review rating={recipeData.expand?.review} caseType={'number'}/>
        </div>
        <div>
          <details className="w-full border-2">
            <summary className="text-body px-14pxr py-12pxr">재료</summary>
            <ul className="py-12pxr px-14pxr bg-gray-100">
              {JSON.parse(recipeData?.ingredients).map((item:IngredientData, index:number) => {
                return (
                  <li key={index} className="flex justify-between w-full py-11pxr text-sub border-b-2">
                    <p>{item.name}</p>
                    <p>{item.amount}</p>
                  </li>
                )
              })}
            </ul>
          </details>
          <details className="w-full border-2">
            <summary className="text-body px-14pxr py-12pxr">양념</summary>
            <ul className="py-12pxr px-14pxr bg-gray-100">
              {JSON.parse(recipeData?.seasoning).map((item:IngredientData, index:number) => {
                return (
                  <li key={index} className="flex justify-between w-full py-11pxr text-sub border-b-2">
                    <p>{item.name}</p>
                    <p>{item.amount}</p>
                  </li>
                )
              })}
            </ul>
          </details>
          <details className="w-full border-2">
            <summary className="text-body px-14pxr py-12pxr">영양정보</summary>
            <ul className="py-12pxr px-14pxr bg-gray-100">
              {JSON.parse(recipeData?.seasoning).map((item:IngredientData, index:number) => {
                return (
                  <li key={index} className="flex justify-between w-full py-11pxr text-sub border-b-2">
                    <p>{item.name}</p>
                    <p>{item.amount}</p>
                  </li>
                )
              })}
            </ul>
          </details>
        </div>
      </div>
    </div>
  )
}