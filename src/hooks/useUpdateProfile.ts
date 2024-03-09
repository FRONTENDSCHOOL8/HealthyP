import { db } from '@/api/pocketbase';
import fetchBlobFromUrl from '@/util/fetchBlobFromUrl';

const useUpdateProfile = (collection: string, id: string) => {
  const updateUserData = async (item: string, data: string) => {
    try {
      if (item === 'avatar') {
        const blobData = await fetchBlobFromUrl(data);
        const newData = new FormData();
        newData.append(item, blobData as string | Blob);
        await db.collection(collection).update(id, newData);
        return updateUserData;
      } else if (item === 'name') {
        const newData = new FormData();
        newData.append(item, data);
        await db.collection(collection).update(id, newData);
        return updateUserData;
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return updateUserData;
};

export default useUpdateProfile;
