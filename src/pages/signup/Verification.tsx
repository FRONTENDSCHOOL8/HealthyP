import { FooterButton, Footer } from '@/components';
import Header from '@/components/header/Header';
import { MemoizedEmailComponent as EmailComponent } from '@/components/input/EmailComponent';
import {
  MemoizedPasswordComponent as PasswordComponent,
  MemoizedPasswordConfirmComponent as PasswordConfirmComponent,
} from '@/components/input/PasswordComponent';
import { ProgressBar } from '@/components/pagination/Pagination';
import { useAtom } from 'jotai';
import { emailValid, passwordConfirmValid, passwordValid } from '@/stores/stores';
import { TwoButtonModal } from '@/components/modal/TwoButtonModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emphasizeClass = 'text-title-2-em text-primary';

export function Verification() {
  const [isEmailValid] = useAtom(emailValid);
  const [isPasswordValid] = useAtom(passwordValid);
  const [isPasswordConfirmValid] = useAtom(passwordConfirmValid);

  // 모달창 상태관리
  const [isOpen, setIsOpen] = useState(false);

  // 헤더 닫기 버튼 클릭 시
  const handleHeaderClick = () => {
    setIsOpen(true);
  };

  // 모달창 닫기 버튼 클릭 시
  const handleClose = () => {
    setIsOpen(false);
  };

  // 모달창 확인 버튼 클릭 시
  const handleConfirm = () => {
    navigate('/');
  };

  const navigate = useNavigate();

  const isActive = isEmailValid && isPasswordValid && isPasswordConfirmValid;

  const goToEmailVerification = () => {
    return '/signup/confirm'; // 경로 반환
  };

  return (
    <>
      <Header option="titlewithCloseAndFn" title="회원가입" handleClick={handleHeaderClick} />
      <div role="group" className="mx-14pxr mt-18pxr mb-198pxr">
        <p className="text-title-2 mb-59pxr">
          가입하실 <br /> <span className={emphasizeClass}>이메일</span>과{' '}
          <span className={emphasizeClass}>비밀번호</span>를 <br /> 입력해주세요
        </p>
        <form role="group" className="flex flex-col">
          <EmailComponent label error valid />
          <PasswordComponent label error />
          <PasswordConfirmComponent />
        </form>
      </div>

      <Footer>
        <ProgressBar init={33} progress={66} />
        <FooterButton
          buttonCase="large"
          text={['이메일 인증 받기']}
          route={[goToEmailVerification]}
          isActive={isActive}
        />
      </Footer>
      <TwoButtonModal
        isOpen={isOpen}
        headline="정말 나가시겠습니까?"
        closeModal={handleClose}
        confirmModal={handleConfirm}
        isAnimated={false}
      />
    </>
  );
}
