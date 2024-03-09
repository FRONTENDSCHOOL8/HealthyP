import { useState, useEffect } from 'react';
import useUpdateProfile from './useUpdateProfile';

const useImagePreview = (file: File | null, collection: string, id: string) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const updateProfile = useUpdateProfile(collection, id);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

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
