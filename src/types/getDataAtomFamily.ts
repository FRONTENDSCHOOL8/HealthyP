export interface getDataInterface {
  item: string;
  typeOfGetData: 'getFullList' | 'getOne' | 'getList' | 'getFirstListItem';
  options?: object;
  setting?: number | string
}

export interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface Rating {
  collectionId: string;
  collectionName: string;
  created: string;
  creator: string;
  id: string;
  review_stars: number;
  review_text: string;
  updated: string;
}

export interface RecipeData {
  expand: {
    rating: Rating[];
  };
}