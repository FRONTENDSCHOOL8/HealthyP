import { Provider, atom } from 'jotai';
import InputComponent from '@/components/input/InputComponent';
import { FnButton } from '@/components/buttons/FnButton';
import { useNavigate } from 'react-router-dom';
import arrowBig from '@/assets/icons/arrowBig.svg';
import Header from '@/components/header/Header';
// import Header from '@/components/header/Header';
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
  const navigate = useNavigate();

  return (
    <div className="w-full relative">
      <InputComponent option="password" />
      <FnButton 
          image={arrowBig} 
          clickHandler={() => navigate(-1)}
          altText="뒤로가기"
          size={30} />

      <Header option="onlyArrow" />
    </div>
  );
}
