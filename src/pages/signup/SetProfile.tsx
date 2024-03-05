import { Button, Footer, Header } from '@/components';
import NicknameComponent from '@/pages/signup/components/NicknameComponent';
import { ProgressBar } from '@/components/pagination/Pagination';
import { generateRandomName } from '@/components/term/termData';
import { useAtom } from 'jotai';
import {
  emailAtom,
  nicknameAtom,
  nicknameValidAtom,
  passwordAtom,
} from '@/stores/stores';
import { db } from '@/api/pocketbase';

import { useNavigate } from 'react-router-dom';

// label 에 들어갈 css class
const emphasizeClass = 'text-title-2-em text-primary';
// 랜덤 닉네임 생성
const randomName = generateRandomName();

// 포켓베이스에 넘길 데이터 타입
interface UserData {
  name: string;
  email: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
}

// setProfile 페이지
export function SetProfile() {
  // 닉네임 input 에 입력값이 없을 때 대신 들어갈 placeholder

  // 닉네임 입력값 상태
  const [nicknameValue] = useAtom(nicknameAtom);
  const [isNicknameValid] = useAtom(nicknameValidAtom);
  const [emailValue] = useAtom(emailAtom);
  const [passwordValue] = useAtom(passwordAtom);

  // 회원가입 완료 페이지로 이동
  const goToComplete = () => {
    return '/signup/complete';
  };

  // 포켓베이스에 회원정보 저장
  const createUser = async (username: string): Promise<boolean> => {
    const data: UserData = {
      name: username,
      email: emailValue,
      emailVisibility: true,
      password: passwordValue,
      passwordConfirm: passwordValue,
    };
    try {
      await db.collection('users').create(data);
      return true;
    } catch (error) {
      console.error('에러발생: ', error);
      return false;
    }
  };
  const navigate = useNavigate();

  // 시작하기 버튼 클릭 시
  const handleClick = async () => {
    const realNickname = nicknameValue || randomName;

    // 포켓베이스에 넘길 데이터더미
    const success = await createUser(realNickname);

    if (success) {
      const path = goToComplete();
      navigate(path);
    } else {
      console.error('알 수 없는 이유로 회원가입에 실패했습니다.');
    }
  };

  return (
    <>
      <Header option="titleWithClose" title="회원가입" />
      <div role="group" className="mx-14pxr mt-18pxr mb-198pxr">
        <p className="text-title-2 mb-59pxr">
          <span className={emphasizeClass}>사용자 정보</span>를 <br />
          <span className={emphasizeClass}>입력</span>하시고 <br /> 가입을
          완료해주세요
        </p>
        <NicknameComponent placeholder={randomName} />
      </div>
      <Footer>
        <ProgressBar init={66} progress={100} />
        <Button
          buttonCase="large"
          text={['시작하기']}
          route={[goToComplete]}
          isActive={isNicknameValid}
          onClick={handleClick}
        />
      </Footer>
    </>
  );
}
