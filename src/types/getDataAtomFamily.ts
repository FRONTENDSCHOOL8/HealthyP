export interface getDataInterface {
  item: string;
  typeOfGetData: 'getFullList' | 'getOne' | 'getList' | 'getFirstListItem';
  options?: object;
  setting?: number | string;
  id? : string;
}

export interface DataState<T> {
  map(arg0: (data: object) => any): unknown;
  data: T | null;
  loading: boolean;
  error: Error | null;
}
