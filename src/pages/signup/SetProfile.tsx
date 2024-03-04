import { Button, Footer, Header } from '@/components';
import NicknameComponent from '@/components/input/NicknameComponent';
import { ProgressBar } from '@/components/pagination/Pagination';
import { generateRandomName } from '@/components/term/termData';

const emphasizeClass = 'text-title-2-em text-primary';

export function SetProfile() {
  const goToComplete = () => {
    return '/signup/complete';
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
        <NicknameComponent placeholder={generateRandomName()} />
      </div>
      <Footer>
        <ProgressBar init={66} progress={100} />
        <Button
          buttonCase="large"
          text={['시작하기']}
          route={[goToComplete]}
          isActive={false}
        />
      </Footer>
    </>
  );
}
