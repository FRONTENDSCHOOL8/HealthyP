import { Provider, useAtom, atom } from 'jotai';
import InputComponent from '@/components/input/InputComponent';
import SwiperMain from '@/components/swiper/SwiperMain';

export const passwordAtom = atom('');

export default function SearchPage() {
  return (
    <Provider>
      <SearchPageContent />
    </Provider>
  );
}

function SearchPageContent() {
  // const [password] = useAtom(passwordAtom);

  return (
    <div className="w-full relative">
      <InputComponent option="password" />
    </div>
  );
}
