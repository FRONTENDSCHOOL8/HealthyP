const PB_URL = import.meta.env.VITE_PB_URL;

export default function getPbImage(collectionId : string, id : string, thumbnail : string) {
  return `${PB_URL}/api/files/${collectionId}/${id}/${thumbnail}`;
}

export function getPbImageArray(collectionId : string, id : string, images : string[]) {
  return images.map(
    (image) => `${PB_URL}/api/files/${collectionId}/${id}/${image}`
  );
}
