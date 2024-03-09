const fetchBlobFromUrl = async (blobUrl: string): Promise<Blob> => {
  const response = await fetch(blobUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const blobData: Blob = await response.blob();
  return blobData;
};

export default fetchBlobFromUrl;
