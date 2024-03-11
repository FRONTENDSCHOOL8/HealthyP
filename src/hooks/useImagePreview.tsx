import { useState, useEffect } from 'react';
import useUpdateProfile from './useUpdateProfile';

const useImagePreview = (file: File | null, collection: string, id: string) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const updateProfile = useUpdateProfile(collection, id);

  useEffect(() => {
    const getStorageData = localStorage.getItem('pocketbase_auth');
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    if (!getStorageData) return;

    (async () => {
      await updateProfile('avatar', url);
    })();

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file, collection, id]);

  return previewUrl;
};

export default useImagePreview;
