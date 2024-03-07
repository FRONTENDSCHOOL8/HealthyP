import { OneButtonModal } from '@/components/modal/OneButtonModal';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';

function FinderComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleModalClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ul className="flex text-cap-1 text-gray-500 mt-11pxr justify-center">
        <li className="border-r pr-10pxr">
          <button onClick={handleButtonClick}>비밀번호 찾기</button>
        </li>
        <li className="border-r pr-10pxr pl-10pxr">
          <button onClick={handleButtonClick}>아이디 찾기</button>
        </li>
        <li className="pl-10pxr">
          <Link to={'/signup'}>회원가입</Link>
        </li>
      </ul>
      <OneButtonModal isOpen={isOpen} confirmModal={handleModalClick} />
    </>
  );
}

export const Finder = memo(FinderComponent);
