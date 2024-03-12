import { FooterButton, Footer } from '@/components';
import Header from '@/components/header/Header';
import { TwoButtonModal } from '@/components/modal/TwoButtonModal';
import { ProgressBar } from '@/components/pagination/Pagination';
import AllAgreeButton from '@/components/term/AllAgreeButton';
import { Term } from '@/components/term/Term';
import { isCheckedOptionsAtom, isCheckedRequiredAtom } from '@/components/term/atomTerm';
import { EMAIL_SERVICE, FIRST_MAIN, SECOND_MAIN, TERM_OF_USE } from '@/components/term/termData';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emphasizeClass = 'text-title-2-em text-primary';

export function Terms() {
  const [progress, setProgress] = useState(33);
  const navigate = useNavigate();

  const [isCheckedRequired, setIsCheckedRequired] = useAtom(isCheckedRequiredAtom);
  const [isCheckedOptions, setIsCheckedOptions] = useAtom(isCheckedOptionsAtom);
  const [isCheckedAll, setIsCheckedAll] = useState(false);

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

  const handleAllCheckedChange = () => {
    const newCheckedState = !isCheckedAll;

    setIsCheckedAll(newCheckedState);
    setIsCheckedRequired(newCheckedState);
    setIsCheckedOptions(newCheckedState);
  };

  useEffect(() => {
    setIsCheckedAll(isCheckedRequired && isCheckedOptions);
  }, [isCheckedOptions, isCheckedRequired]);

  // 상태를 업데이트하고 경로 문자열을 반환하는 함수
  const goToMakeIdPage = () => {
    setProgress(66); // 상태 업데이트
    return '/signup/verify'; // 경로 반환
  };

  // progress 상태가 변경될 때마다 이동을 처리
  useEffect(() => {
    if (progress === 66) {
      navigate('/signup/verify');
    }
  }, [progress, navigate]);

  const isActive = isCheckedRequired;

  return (
    <>
      <Header option="titlewithCloseAndFn" title="회원가입" handleClick={handleHeaderClick} />
      <div role="group" className="mx-14pxr mt-18pxr pb-140pxr mb-198pxr">
        <p className="text-title-2 mb-59pxr">
          <span className={emphasizeClass}>이용약관</span>을 보시고 <br /> <span className={emphasizeClass}>동의</span>
          를 눌러주세요
        </p>
        <div className="flex flex-col gap-24pxr">
          <AllAgreeButton isCheckedAll={isCheckedAll} handleAllCheckedChange={handleAllCheckedChange} />
          <Term name="checkedRequired" required={true} mainContent={FIRST_MAIN} subContent={TERM_OF_USE} />
          <Term name="checkedOptions" required={false} mainContent={SECOND_MAIN} subContent={EMAIL_SERVICE} />
        </div>
      </div>

      <Footer>
        <ProgressBar init={0} progress={progress} />
        <FooterButton buttonCase="large" text={['다음']} route={[goToMakeIdPage]} isActive={isActive} />
        <TwoButtonModal
          isOpen={isOpen}
          headline="정말 나가시겠습니까?"
          closeModal={handleClose}
          confirmModal={handleConfirm}
          isAnimated={false}
        />
      </Footer>
    </>
  );
}
