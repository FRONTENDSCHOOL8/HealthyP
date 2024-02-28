import { Provider, useAtom, atom } from 'jotai';
import InputComponent from '@/components/input/InputComponent';
import SwiperMain from '@/components/swiper/SwiperMain';

import { getDataAtomFamily } from '@/util';

export const passwordAtom = atom('');

export default function SearchPage() {
  const [{ data }] = useAtom(
    getDataAtomFamily({
      item: 'recipes',
      typeOfGetData: 'getFullList',
    })
  );

  console.log(data);

  return (
    <Provider>
      <SearchPageContent />
    </Provider>
  );
}

function SearchPageContent() {
  const [password] = useAtom(passwordAtom);

  return (
    <div className="w-full relative">
      <SwiperMain />
      <InputComponent option="password" />
    </div>
  );
}
