import { db } from '@/api/pocketbase';
import { getDataInterface } from '@/types';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import isEqual from 'lodash/isEqual';
import { DataState } from '@/types';

export const getDataAtomFamily = atomFamily((params: getDataInterface) => {
  const dataFunctionsMap = {
    getFullList: async () => {
      const { item, options } = params;
      return db.collection(item).getFullList(options);
    },
    getList: async () => {
      const { item, options, setting } = params;
      const page = typeof setting === 'number' ? setting : undefined;
      return db.collection(item).getList(1, page, options);
    },
    getOne: async () => {
      const { item, options, setting } = params;
      const id = typeof setting === 'string' ? setting : '';
      console.log('test');
      return db.collection(item).getOne(id, options);
    },
    getFirstListItem: async () => {
      const { item, options, setting } = params;
      const filter = typeof setting === 'string' ? setting : '';
      return db.collection(item).getFirstListItem(filter, options);
    },
  };

  return atom(async () => {
    const state: DataState<object> = {
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
