const PB_URL = import.meta.env.VITE_PB_URL;

interface getPBImageProps {
  collectionId: string;
  id: string;
  thumbnail: string;
}
interface getPBImageArrProps {
  collectionId: string;
  id: string;
  images: string[];
}

export default function getPbImage({
  collectionId,
  id,
  thumbnail,
}: getPBImageProps) {
  return `${PB_URL}/api/files/${collectionId}/${id}/${thumbnail}`;
}

export function getPbImageArray({
  collectionId,
  id,
  images,
}: getPBImageArrProps) {
  return images.map(
    (image) => `${PB_URL}/api/files/${collectionId}/${id}/${image}`
  );
}
