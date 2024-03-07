import { useState, useEffect } from "react";
import { RecordModel } from "pocketbase";
import { db } from "@/api/pocketbase";
import { FnButton } from "..";

interface BookmarkButtonProps {
  recipeId : string | undefined;
  inactiveImage : string;
  activeImage : string;
}

export default function BookmarkButton({recipeId, inactiveImage, activeImage} : BookmarkButtonProps) {
  const [iconState, setIconState] = useState(false);
  const [userData, setUserData] = useState<RecordModel>();
  
  useEffect(() => {
    async function getUserData() {
      const currentUser = localStorage.getItem("pocketbase_auth");
      if(currentUser === null) return;
      const userId = JSON.parse(currentUser).model.id;
      const response = await db.collection("users").getOne(userId);
      setUserData(response);
      if(response.bookmark.includes(recipeId)) {
        setIconState(true);
      } else {
        setIconState(false);
      }
    }
    getUserData();
  }, [recipeId])

  async function triggerBookmark() {
    setIconState(!iconState);
    if (userData?.bookmark.includes(recipeId)) {
      const newData = {...userData};
      newData.bookmark = newData.bookmark.filter((item : string) => item !== recipeId);
      await db.collection('users').update(userData.id, newData); 
    } else if (!userData?.bookmark.includes(recipeId) && userData?.id !== undefined){
      const newData = {...userData};
      newData?.bookmark.push(recipeId);
      await db.collection('users').update(userData.id, newData); 
      setIconState(true);
    }
  }

  return (
    <>
      <FnButton image={iconState ? activeImage : inactiveImage} clickHandler={triggerBookmark}/>
    </>
  )
}