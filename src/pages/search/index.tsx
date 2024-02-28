import { Provider, useAtom, atom } from 'jotai';
import Header from '@/components/header/Header';
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
  const [password] = useAtom(passwordAtom);

  return (
    <div className='w-full relative'>
      {/* Other components */}
      {/* <Header option="onlyAlarm" /> */}
      {/* <InputComponent option="search" /> */}
      {/* <InputComponent option="email" />
      <InputComponent option="password" />
      <InputComponent option="passwordConfirm" /> */}
      {/* Access the shared password value */}
      {/* <p>{password}</p> */}
      <SwiperMain />
      <InputComponent option="password" />
    </div>
  );
}
