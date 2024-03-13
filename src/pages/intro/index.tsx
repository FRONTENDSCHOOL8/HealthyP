import FullPageInfo from '@/components/FullPageInfo';
import logo from '@/assets/icons/logo.svg';
import { useAtom } from 'jotai';
import { isStore } from '@/stores/stores';
import { useEffect } from 'react';
import { db } from '@/api/pocketbase';

export default function IntroPage() {
  const [, setIsAuth] = useAtom(isStore);

  const isExistStore = !!localStorage.getItem('autoLogin');

  let userEmail = '';
  let userPassword = '';

  if (isExistStore) {
    const autoLoginRaw = localStorage.getItem('autoLogin');
    const autoLogin = autoLoginRaw ? JSON.parse(autoLoginRaw) : false;

    userEmail = autoLogin ? autoLogin.email : '';
    userPassword = autoLogin ? autoLogin.password : '';
  }

  useEffect(() => {
    const checkAuth = async () => {
      setIsAuth(true);
      await db.collection('users').authWithPassword(userEmail, userPassword);
    };

    checkAuth();
  }, [setIsAuth, userEmail, userPassword]);

  return (
    <>
      <FullPageInfo
        route={() => '/'}
        icons={[logo, '헬씨피']}
        text={['더 건강하게', '더 맛있게']}
        hasDetailedDescription={false}
        time={2500}
      />
    </>
  );
}
