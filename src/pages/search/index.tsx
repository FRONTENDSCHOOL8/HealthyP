import { Provider, atom } from 'jotai';

import { Form } from 'react-router-dom';
import { FnButton, InputComponent, Header } from '@/components';
import { useNavigate } from 'react-router-dom';
import arrowBig from '@/assets/icons/arrowBig.svg';

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
      <Header option="onlyArrow" />
      <Form action="/" className="px-20pxr py-20pxr flex flex-col gap-42pxr">
        <InputComponent option="fileInput" inputTitle="메인 이미지 사진" />
        <InputComponent option="nickname" />
      </Form>
    </div>
  );
}
