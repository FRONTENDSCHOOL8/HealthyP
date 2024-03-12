import { FooterButton, Header } from '@/components';
import { MemoizedEmailComponent as EmailComponet } from '../../components/input/EmailComponent';
import { MemoizedPasswordComponent as PasswordComponet } from '../../components/input/PasswordComponent';
import { MemoizedAutoLogin as AutoLogin } from './components/AutoLogin';
import line from '@/assets/icons/line.svg';
import outh2 from '@/assets/icons/outh2.svg';
import { useAtom } from 'jotai';
import { emailAtom, isStore, nicknameAtom, passwordAtom, storeData } from '@/stores/stores';
import { db } from '@/api/pocketbase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Finder } from './components/Finder';
import { Helmet } from 'react-helmet-async';

export function Login() {
  const [emailValue] = useAtom(emailAtom);
  const [passwordValue] = useAtom(passwordAtom);
  const [isFail, setIsFail] = useState(false);
  const [, setNickname] = useAtom(nicknameAtom);
  const [, setExistStore] = useAtom(isStore);
  const [, setStore] = useAtom(storeData);

  const navigate = useNavigate();

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const email: string = emailValue;
      const password: string = passwordValue;
      const path: string = goToMain();

      await db.collection('users').authWithPassword(email, password);

      const modelString = localStorage.getItem('pocketbase_auth');
      if (modelString) {
        const model = JSON.parse(modelString);
        const name = model.model.name;
        setStore(model);
        setExistStore(true);
        setNickname(name);
      }

      navigate(path);
    } catch (error) {
      setIsFail(true);
      console.error('로그인 에러: ', error);
    }
  };

  const goToMain = () => {
    return '/login/welcome';
  };

  return (
    <>
      <Helmet>
        <title>HealthyP | 로그인</title>
      </Helmet>
      <Header option="titleWithClose" title="로그인" />
      <form onSubmit={handleClick} className="px-14pxr pt-57pxr flex flex-col">
        <div className="flex flex-col gap-2 mb-8pxr">
          <EmailComponet />
          <PasswordComponet />
        </div>
        <AutoLogin />
        <div className={`text-warning text-cap-1 flex flex-col pt-2pxr pb-17pxr ${isFail ? 'block' : 'hidden'}`}>
          {isFail && (
            <>
              <span>아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.</span>
              <span>입력하신 내용을 다시 확인해주세요.</span>
            </>
          )}
        </div>
        <FooterButton
          buttonCase="large"
          text={['로그인']}
          route={[goToMain]}
          onClickOne={handleClick as (idx: number | React.FormEvent<HTMLFormElement>) => void}
          isAnimated={false}
        />
      </form>
      <Finder />
      <div className="flex flex-col px-14pxr py-1 mt-104pxr justify-center">
        <div className="flex gap-2">
          <img src={line} alt="Line" className="w-full" />
          <span className="whitespace-nowrap text-cap-1 text-gray-500">SNS 간편 로그인</span>
          <img src={line} alt="Line" className="w-full" />
        </div>
        <img src={outh2} alt="Auth2" className="mt-30pxr" />
      </div>
    </>
  );
}
