import { Header } from "@/components"
import { useParams } from "react-router-dom"
import { db } from "@/api/pocketbase";
import { useEffect, useState } from "react";
import { RecordModel } from "pocketbase";



export function DetailPage() {
  const {recipeId} = useParams();
  const [recipeData, setRecipeData] = useState<RecordModel>();
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    async function getRecipeData() {
      if(recipeId === undefined) return;
      const record = await db.collection("recipes_duplicate").getOne(recipeId);
      const url = db.files.getUrl(record, record.image);
      setImageURL(url);
      setRecipeData(record);
    }
    getRecipeData();
  }, [recipeId])

  if (!recipeData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header option="onlyArrow" bgColor="bg-primary"/>
      <img src={JSON.parse(recipeData.steps)[0].image} alt="" />
      <div>{recipeData?.title}</div>
    </>
  )
}