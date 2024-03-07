import { useNavigate, useParams } from 'react-router-dom';
import { db } from '@/api/pocketbase';
import { useEffect, useState } from 'react';
import { RecordModel } from 'pocketbase';
import { Star, Review, FnButton } from '@/components';
import DOMPurify from 'dompurify';
import arrowBig from '@/assets/icons/arrowBig.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import bookmarkFill from '@/assets/icons/bookmarkFill.svg';

interface IngredientData {
  name: string;
  amount: string;
}

export function DetailPage() {
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState<RecordModel>();
  const [imageURL, setImageURL] = useState('');
  const [headerBg, setHeaderBg] = useState('');
  const [iconState, setIconState] = useState(false);
  const [userData, setUserData] = useState<RecordModel>();
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
    async function getUserData() {
      const currentUser = localStorage.getItem('pocketbase_auth');
      if (currentUser === null) return;
      const userId = JSON.parse(currentUser).model.id;
      const response = await db.collection('users').getOne(userId);
      setUserData(response);
      if (response.bookmark.includes(recipeId)) {
        setIconState(true);
      } else {
        setIconState(false);
      }
    }
    getRecipeData();
    getUserData();
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

  // 북마크 클릭 핸들러
  async function triggerBookmark() {
    setIconState(!iconState);
    if (userData?.bookmark.includes(recipeId)) {
      const newData = { ...userData };
      newData.bookmark = newData.bookmark.filter(
        (item: string) => item !== recipeId
      );
      await db.collection('users').update(userData.id, newData);
    } else if (
      !userData?.bookmark.includes(recipeId) &&
      userData?.id !== undefined
    ) {
      const newData = { ...userData };
      newData?.bookmark.push(recipeId);
      await db.collection('users').update(userData.id, newData);
      setIconState(true);
    }
  }

  return (
    <div className="relative">
      <header
        className={`w-full ${headerBg} px-10pxr py-12pxr flex items-center justify-between z-10 fixed`}
      >
        <FnButton image={arrowBig} clickHandler={() => navigate(-1)} />
        <FnButton
          image={iconState ? bookmarkFill : bookmark}
          clickHandler={triggerBookmark}
        />
      </header>
      <img src={imageURL} alt="" className="w-full max-h-365pxr object-cover" />
      <div className="flex flex-col gap-20pxr py-20pxr bg-white">
        {/* <img src={iconState? add : addFill} alt="" /> */}
        <div className="px-14pxr flex flex-col gap-8pxr">
          <h1 className="text-title-2-em">{recipeData?.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: clearText }}></p>
        </div>
        <div className="flex px-14pxr">
          <Star rating={recipeData.expand?.rating} />
          <Review rating={recipeData.expand?.rating} caseType={'number'} />
        </div>
        <div>
          <details className="w-full border-2">
            <summary className="text-body px-14pxr py-12pxr">재료</summary>
            <ul className="py-12pxr px-14pxr bg-gray-100">
              {JSON.parse(recipeData?.ingredients).map(
                (item: IngredientData, index: number) => {
                  return (
                    <li
                      key={index}
                      className="flex justify-between w-full py-11pxr text-sub border-b-2"
                    >
                      <p>{item.name}</p>
                      <p>{item.amount}</p>
                    </li>
                  );
                }
              )}
            </ul>
          </details>
          <details className="w-full border-2">
            <summary className="text-body px-14pxr py-12pxr">양념</summary>
            <ul className="py-12pxr px-14pxr bg-gray-100">
              {JSON.parse(recipeData?.seasoning).map(
                (item: IngredientData, index: number) => {
                  return (
                    <li
                      key={index}
                      className="flex justify-between w-full py-11pxr text-sub border-b-2"
                    >
                      <p>{item.name}</p>
                      <p>{item.amount}</p>
                    </li>
                  );
                }
              )}
            </ul>
          </details>
          <details className="w-full border-2">
            <summary className="text-body px-14pxr py-12pxr">영양정보</summary>
            <ul className="py-12pxr px-14pxr bg-gray-100">
              {JSON.parse(recipeData?.seasoning).map(
                (item: IngredientData, index: number) => {
                  return (
                    <li
                      key={index}
                      className="flex justify-between w-full py-11pxr text-sub border-b-2"
                    >
                      <p>{item.name}</p>
                      <p>{item.amount}</p>
                    </li>
                  );
                }
              )}
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
