import { useEffect, useState } from "react";
import { RecordModel } from "pocketbase";
import { db } from "@/api/pocketbase";


export function useDetailInfo(recipeId : string | undefined) {
  const [recipeData, setRecipeData] = useState<RecordModel>();
  const [imageURL, setImageURL] = useState('');
  const [headerBg, setHeaderBg] = useState('');
  const [userData, setUserData] = useState<RecordModel | undefined>();
  
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
    async function getUserData() {
      const currentUser = localStorage.getItem("pocketbase_auth");
      if(currentUser === null) return;
      const userId = JSON.parse(currentUser).model.id;
      const response = await db.collection("users").getOne(userId, {requestKey:null});
      if (response === undefined) return;
      setUserData(response);
    }
    getUserData();
    getRecipeData();
    window.addEventListener('scroll', handleScroll);
    db.collection('users').subscribe('*', getUserData)

    return () => {
      window.removeEventListener('scroll', handleScroll);
      db.collection('users').unsubscribe();
    };
  }, [recipeId]);

  return {recipeData, imageURL, headerBg, userData}
}