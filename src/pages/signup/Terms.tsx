import { Button, Footer } from '@/components';
import Header from '@/components/header/Header';
import { ProgressBar } from '@/components/pagination/Pagination';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emphasizeClass = 'text-title-2-em text-primary';

const Term = ({ name }: { name: string }) => {
  return (
    <div className="rounded-[7px] border border-gray-200">
      <div className="p-12pxr flex gap-2">
        <input type="checkbox" name={name} id={name} />
        <label htmlFor={name} className="text-foot text-gray-500">
          HealthyP 이용 약관 동의
          <span className="text-primary">(필수)</span>
        </label>
      </div>
      <hr />
      <p className="text-gray-700 text-sub px-14pxr py-4pxr bg-[#F0F0F1]">
        제 1조 국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 제2항의
        재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이 지명하는 자를
        임명한다. 제 2조 국회의원의 수는 법률로 정하되, 200인 이상으로 한다.
        제2항의 재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이 지명하는
        자를 임명한다. 제 3조 국회의원의 수는 법률로 정하되, 200인 이상으로
        한다. 제2항의 재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이
        지명하는 자를 임명한다.
      </p>
    </div>
  );
};

export function Terms() {
  const [progress, setProgress] = useState(33);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  // 상태를 업데이트하고 경로 문자열을 반환하는 함수
  const goToEmailVerification = () => {
    setProgress(66); // 상태 업데이트
    return '/signup/verify'; // 경로 반환
  };

  // progress 상태가 변경될 때마다 이동을 처리
  useEffect(() => {
    if (progress === 66) {
      navigate('/signup/verify');
    }
  }, [progress, navigate]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <Header option="titleWithClose" title="회원가입" />
      <div role="group" className="mx-14pxr mt-18pxr mb-198pxr">
        <p className="text-title-2 mb-59pxr">
          <span className={emphasizeClass}>이용약관</span>을 보시고 <br />{' '}
          <span className={emphasizeClass}>동의</span>를 눌러주세요
        </p>
        <div className="flex flex-col gap-24pxr">
          <div role="group" className="flex items-center pb-10pxr">
            <input
              type="checkbox"
              name="agreeAll"
              id="agreeAll"
              className="hidden cursor-pointer"
              onChange={handleCheckboxChange}
              checked={isChecked}
            />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleCheckboxChange}
              className="cursor-pointer"
            >
              <path
                d="M10.601 14.1664L8.28897 11.8496C8.15145 11.7153 7.98718 11.6465 7.79617 11.6433C7.60515 11.6401 7.43881 11.7093 7.29714 11.851C7.15227 11.9959 7.07984 12.1622 7.07984 12.35C7.07984 12.5378 7.15081 12.7011 7.29274 12.8398L10.001 15.5481C10.1704 15.7237 10.3698 15.8115 10.5991 15.8115C10.8285 15.8115 11.0307 15.7237 11.2058 15.5481L16.6885 10.0654C16.8237 9.93014 16.8929 9.767 16.8962 9.57597C16.8994 9.38495 16.8301 9.21701 16.6885 9.07214C16.5436 8.93047 16.3773 8.85964 16.1894 8.85964C16.0016 8.85964 15.838 8.92937 15.6985 9.06884L10.601 14.1664ZM12.0023 21.2981C10.7164 21.2981 9.50757 21.0537 8.37567 20.5649C7.24377 20.0762 6.25917 19.4129 5.42187 18.5751C4.58457 17.7372 3.92192 16.7534 3.43394 15.6237C2.94596 14.4939 2.70197 13.2868 2.70197 12.0023C2.70197 10.7164 2.94634 9.50757 3.43509 8.37567C3.92382 7.24377 4.58712 6.25917 5.42497 5.42187C6.2628 4.58457 7.24659 3.92192 8.37634 3.43394C9.50609 2.94596 10.7132 2.70197 11.9977 2.70197C13.2836 2.70197 14.4925 2.94634 15.6244 3.43509C16.7563 3.92382 17.7409 4.58711 18.5782 5.42496C19.4155 6.2628 20.0781 7.24659 20.5661 8.37634C21.0541 9.50609 21.2981 10.7132 21.2981 11.9977C21.2981 13.2836 21.0537 14.4925 20.5649 15.6244C20.0762 16.7563 19.4129 17.7409 18.5751 18.5782C17.7372 19.4155 16.7534 20.0781 15.6237 20.5661C14.4939 21.0541 13.2868 21.2981 12.0023 21.2981Z"
                fill={isChecked ? '#91BD14' : '#B2B2B3'}
              />
            </svg>
            <label
              htmlFor="agreeAll"
              className="ml-8pxr text-body-em cursor-pointer"
            >
              전체 동의하기
            </label>
          </div>
          <Term name="checkedRequired" />
          <Term name="checkedOption" />
        </div>
      </div>

      <Footer>
        <ProgressBar init={0} progress={progress} />
        <Button
          buttonCase="large"
          text={['다음']}
          route={[goToEmailVerification]}
          isActive={false}
        />
      </Footer>
    </>
  );
}
