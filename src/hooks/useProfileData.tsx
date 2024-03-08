import { db } from '@/api/pocketbase';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { userCollection, userCollectionId } from '@/stores/stores';

const useProfileData = () => {
  const [userName, setUserName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [collection, setCollection] = useAtom(userCollection);
  const [id, setId] = useAtom(userCollectionId);

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
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, [setCollection, setId]);

  return { collection, id, userName, setUserName, imageUrl };
};

export default useProfileData;
