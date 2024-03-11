import { db } from '@/api/pocketbase';
import { imageUrlAtom, userCollection, userNameAtom, userRecordId } from '@/stores/stores';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const useProfileData = () => {
  const [userName, setUserName] = useAtom(userNameAtom);
  const [imageUrl, setImageUrl] = useAtom(imageUrlAtom);

  const [collection, setCollection] = useAtom(userCollection);
  const [id, setId] = useAtom(userRecordId);

  useEffect(() => {
    async function fetchUserData() {
      const localData = localStorage.getItem('pocketbase_auth');
      if (!localData) return;

      try {
        const jsonData = JSON.parse(localData);
        const { collectionName, id: userId } = jsonData.model;
        setCollection(collectionName);
        setId(userId);

        const record = await db.collection(collectionName).getOne(userId);
        setImageUrl(db.files.getUrl(record, record.avatar));
        setUserName(record.name);
      } catch (error) {
        // console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);

  return { collection, id, userName, setUserName, imageUrl };
};

export default useProfileData;
