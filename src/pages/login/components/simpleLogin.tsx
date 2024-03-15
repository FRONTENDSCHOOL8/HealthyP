import line from '@/assets/icons/line.svg';
import kakao from '@/assets/icons/kakao.svg';
import naver from '@/assets/icons/naver.svg';
import google from '@/assets/icons/google.svg';
import { db } from '@/api/pocketbase';
import { useNavigate } from 'react-router-dom';
import { OneButtonModal } from '@/components';
import { useState } from 'react';

const STYLES = 'flex flex-col gap-1 items-center';

interface MetaType {
  name: string;
}

export default function SimpleLogin() {
  const [isopen, setIsopen] = useState(false);
  const navigate = useNavigate();

  // 구글 로그인
  const handleGoogleLogin = async () => {
    try {
      const google = await db.collection('users').authWithOAuth2({ provider: 'google' });
      console.log(google);

      const meta = { name: google.meta?.name };
      await updateUserRecord(meta);

      navigate('/login/welcome');
    } catch (error) {
      console.error('구글 로그인 에러: ', error);
    }
  };

  // 카카오 로그인
  const handleKakaoLogin = async () => {
    try {
      const kakao = await db.collection('users').authWithOAuth2({ provider: 'kakao' });
      console.log(kakao);

      const meta = { name: kakao.meta?.username };
      await updateUserRecord(meta);

      navigate('/login/welcome');
    } catch (error) {
      console.error('카카오 로그인 에러: ', error);
    }
  };

  // 유저 레코드 업데이트
  async function updateUserRecord(meta: MetaType) {
    try {
      const nowIdRaw = localStorage.getItem('pocketbase_auth');
      console.log('nowIdRaw: ', nowIdRaw);

      const nowId = nowIdRaw ? JSON.parse(nowIdRaw).model.id : null;
      console.log('nowId: ', nowId);
      console.log('meta: ', meta);

      await db.collection('users').update(nowId, { name: meta.name });
    } catch (error) {
      console.error('유저 레코드 업데이트 에러: ', error);
    }
  }

  const handleNaverLogin = () => {
    setIsopen(true);
  };

  return (
    <div className="flex flex-col px-14pxr py-1 mt-104pxr items-center">
      <div className="flex gap-2">
        <img src={line} alt="Line" className="w-full" />
        <span className="whitespace-nowrap text-cap-1 text-gray-500">SNS 간편 로그인</span>
        <img src={line} alt="Line" className="w-full" />
      </div>
      <div className="flex text-sub-em text-gray_700 gap-48pxr">
        <button className={STYLES} onClick={handleKakaoLogin}>
          <img src={kakao} alt="카카오톡 간편로그인" className="mt-30pxr" />
          <span className="text-center">카카오톡</span>
        </button>
        <button className={STYLES} onClick={handleNaverLogin}>
          <img src={naver} alt="네이버 간편로그인" className="mt-30pxr" />
          <span className="text-center">네이버</span>
        </button>
        <button className={STYLES} onClick={handleGoogleLogin}>
          <img src={google} alt="구글 간편로그인" className="mt-30pxr" />
          <span className="text-center">구글</span>
        </button>
      </div>
      <OneButtonModal isOpen={isopen} confirmModal={() => setIsopen(false)} />
    </div>
  );
}
