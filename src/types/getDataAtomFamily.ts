export interface getDataInterface {
  item: string;
  typeOfGetData: 'getFullList' | 'getOne' | 'getList' | 'getFirstListItem';
  options?: object;
  setting?: number | string
}