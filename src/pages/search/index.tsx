import { Provider, atom } from 'jotai';
import InputComponent from '@/components/input/InputComponent';
// import { FnButton } from '@/components/buttons/FnButton';
import Header from '@/components/header/Header';
// import Header from '@/components/header/Header';
import { Form } from 'react-router-dom';

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
  // const navigate = useNavigate();

  return (
    <div className="w-full relative">
      {/* <FnButton 
          image={arrowBig} 
          clickHandler={() => navigate(-1)}
          altText="뒤로가기"
        size={30} /> */}

      <Header option="onlyArrow" />
      <Form action='/'>
        <InputComponent option="fileInput" inputTitle="레시피 사진" />
        <InputComponent option="nickname" />
      </Form>
    </div>
  );
}
