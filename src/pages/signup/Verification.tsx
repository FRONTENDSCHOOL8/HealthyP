import { pb } from '@/api/pocketbase';
import { Button, Footer, InputComponent } from '@/components';
import Header from '@/components/header/Header';
import { ProgressBar } from '@/components/pagination/Pagination';
import { useEffect, useState } from 'react';

const emphasizeClass = 'text-title-2-em text-primary';

export function Verification() {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false);

  const isActive = isEmailValid && isPasswordValid && isPasswordConfirmValid;

  const goToEmailVerification = () => {
    return '/signup/confirm'; // 경로 반환
  };

  return (
    <>
      <Header option="titleWithClose" title="회원가입" />
      <div role="group" className="mx-14pxr mt-18pxr mb-198pxr">
        <p className="text-title-2 mb-59pxr">
          가입하실 <br /> <span className={emphasizeClass}>이메일</span>과{' '}
          <span className={emphasizeClass}>비밀번호</span>를 <br /> 입력해주세요
        </p>
        <form role="group" className="flex flex-col">
          <InputComponent option="email" onValidationChange={setIsEmailValid} />
          <InputComponent
            option="password"
            onValidationChange={setIsPasswordValid}
          />
          <InputComponent
            option="passwordConfirm"
            onValidationChange={setIsPasswordConfirmValid}
          />
        </form>
      </div>

      <Footer>
        <ProgressBar init={33} progress={66} />
        <Button
          buttonCase="large"
          text={['이메일 인증 받기']}
          route={[goToEmailVerification]}
          isActive={isActive}
        />
      </Footer>
    </>
  );
}


