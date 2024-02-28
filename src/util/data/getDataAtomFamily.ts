import { pb } from '@/api/pocketbase';
import { getDataInterface } from '@/types';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import isEqual from 'lodash/isEqual';
import { RecipesResponse, CollectionResponses } from '@/types/pocketbase-types';
import { ListResult } from 'pocketbase';

type Tmetadata = {
  likes: number;
};
type Texpand = {
  user: UsersResponse;
};
type stateType = {
  data:
    | RecipesResponse<Tmetadata, Texpand>
    | RecipesResponse<Tmetadata, Texpand>[]
    | ListResult<RecipesResponse<Tmetadata, Texpand>>
    | null;
  loading: boolean;
  error?: 'string' | null;
};

export const getDataAtomFamily = atomFamily((params: getDataInterface) => {
  const dataFunctionsMap = {
    getFullList: async () => {
      const { item, options } = params;
      return pb
        .collection(item)
        .getFullList<CollectionResponses<Tmetadata, Texpand>>(options);
    },
    getList: async () => {
      const { item, options, setting } = params;
      const page = typeof setting === 'number' ? setting : undefined;
      return pb
        .collection(item)
        .getList<CollectionResponses<Tmetadata, Texpand>>(1, page, options);
    },
    getOne: async () => {
      const { item, options, setting } = params;
      const id = typeof setting === 'string' ? setting : '';
      return pb
        .collection(item)
        .getOne<CollectionResponses<Tmetadata, Texpand>>(id, options);
    },
    getFirstListItem: async () => {
      const { item, options, setting } = params;
      const filter = typeof setting === 'string' ? setting : '';
      return pb
        .collection(item)
        .getFirstListItem<
          CollectionResponses<Tmetadata, Texpand>
        >(filter, options);
    },
  };

  return atom(async () => {
    const state: stateType = {
      data: null,
      loading: true,
      error: null,
    };

    try {
      const { typeOfGetData } = params;
      const dataFunction = dataFunctionsMap[typeOfGetData];
      if (dataFunction) {
        state.data = await dataFunction();
      } else {
        console.error(`지원하지 않는 typeOfGetData 입니다: ${typeOfGetData}`);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('데이터를 불러오는데 실패했습니다.', error);
        state.error;
      }
    } finally {
      state.loading = false;
    }

    return state;
  });
}, isEqual);
