import { Button, Footer } from '@/components';
import Header from '@/components/header/Header';
import { MemoizedEmailComponent as EmailComponent } from '@/components/input/EmailComponent';
import {
  MemoizedPasswordComponent as PasswordComponent,
  MemoizedPasswordConfirmComponent as PasswordConfirmComponent,
} from '@/components/input/PasswordComponent';
import { ProgressBar } from '@/components/pagination/Pagination';
import { useAtom } from 'jotai';
import {
  emailValid,
  passwordConfirmValid,
  passwordValid,
} from '@/stores/stores';

const emphasizeClass = 'text-title-2-em text-primary';

export function Verification() {
  const [isEmailValid] = useAtom(emailValid);
  const [isPasswordValid] = useAtom(passwordValid);
  const [isPasswordConfirmValid] = useAtom(passwordConfirmValid);

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
          <EmailComponent label />
          <PasswordComponent label />
          <PasswordConfirmComponent />
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
