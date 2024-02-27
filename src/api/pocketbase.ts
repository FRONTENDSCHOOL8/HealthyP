import Pocketbase from 'pocketbase';

export const pb = new Pocketbase(import.meta.env.VITE_PB_URL);

export type RatingData = {
  id: string,
  collectionId: string,
  created: string,
  updated: string,
  creator: string,
  review_stars: number,
  review_text: string
}