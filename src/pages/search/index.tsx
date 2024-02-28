import { Provider, useAtom, atom } from 'jotai';
import Header from '@/components/header/Header';
import InputComponent from '@/components/input/InputComponent';


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
    <div>
      {/* Other components */}
      <Header option="onlyAlarm" />
      <InputComponent option="search" />
      <InputComponent option="email" />
      <InputComponent option="password" />
      <InputComponent option="passwordConfirm" />
      {/* Access the shared password value */}
      <p>{password}</p>
    </div>
  );
}
