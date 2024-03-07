import { useState, useEffect } from 'react';
import { RecordModel } from 'pocketbase';
import { db } from '@/api/pocketbase';
import { FnButton } from '..';

interface BookmarkButtonProps {
  recipeId: string | undefined;
  userData: RecordModel | undefined;
}

export default function BookmarkButton({
  recipeId,
  userData,
}: BookmarkButtonProps) {
  const [iconState, setIconState] = useState(false);

  useEffect(() => {
    async function updateIconState() {
      if (userData?.bookmark.includes(recipeId)) {
        setIconState(true);
      } else {
        setIconState(false);
      }
    }
    updateIconState();
  }, [recipeId, userData?.bookmark]);

  async function triggerBookmark() {
    if (userData?.bookmark.includes(recipeId)) {
      const newData = { ...userData };
      newData.bookmark = newData.bookmark.filter(
        (item: string) => item !== recipeId
      );
      await db.collection('users').update(userData.id, newData);
      console.log('false');
      setIconState(false);
    } else if (
      !userData?.bookmark.includes(recipeId) &&
      userData?.id !== undefined
    ) {
      const newData = { ...userData };
      newData?.bookmark.push(recipeId);
      await db.collection('users').update(userData.id, newData);
      console.log('true');
      setIconState(true);
    }
  }

  return (
    <>
      <FnButton
        image={iconState ? 'bookmarkFill' : 'bookmark'}
        clickHandler={triggerBookmark}
      />
    </>
  );
}
