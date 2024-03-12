import { FooterButton, Footer, Header } from '@/components';
import NicknameComponent from '@/pages/signup/components/NicknameComponent';
import { ProgressBar } from '@/components/pagination/Pagination';
import { generateRandomName } from '@/components/term/termData';
import { useAtom } from 'jotai';
import {
  emailAtom,
  nicknameAtom,
  nicknameValidAtom,
  passwordAtom,
  userCollection,
  userRecordId,
} from '@/stores/stores';
import { db } from '@/api/pocketbase';

import { useNavigate } from 'react-router-dom';
import { TwoButtonModal } from '@/components/modal/TwoButtonModal';
import { ChangeEvent, useState } from 'react';
import useImagePreview from '@/hooks/useImagePreview';
import useProfileData from '@/hooks/useProfileData';

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
  avatar: File | null;
}

// setProfile 페이지
export function SetProfile() {
  // 닉네임 input 에 입력값이 없을 때 대신 들어갈 placeholder

  // 닉네임 입력값 상태
  const [nicknameValue] = useAtom(nicknameAtom);
  const [isNicknameValid] = useAtom(nicknameValidAtom);
  const [emailValue] = useAtom(emailAtom);
  const [passwordValue] = useAtom(passwordAtom);

  const [collection] = useAtom(userCollection);
  const [id] = useAtom(userRecordId);
  const [selectImage, setSelectImage] = useState<File | null>(null);
  const previewUrl = useImagePreview(selectImage, collection, id);
  const { imageUrl } = useProfileData();

  const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectImage(file);
  };

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
      avatar: selectImage,
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
      <Header option="titlewithCloseAndFn" title="회원가입" handleClick={handleHeaderClick} />
      <div role="group" className="mx-14pxr mt-18pxr mb-198pxr">
        <p className="text-title-2 mb-59pxr">
          <span className={emphasizeClass}>사용자 정보</span>를 <br />
          <span className={emphasizeClass}>입력</span>하시고 <br /> 가입을 완료해주세요
        </p>
        <div className="flex flex-col items-center w-full gap-58pxr">
          <label htmlFor="dropzone-file">
            <div className="w-94pxr h-94pxr bg-gray_200 rounded-full relative">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile" className="w-94pxr h-94pxr bg-gray_200 rounded-full object-cover" />
              ) : (
                imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Profile preview"
                    className="w-94pxr h-94pxr bg-gray_200 rounded-full object-cover"
                  />
                )
              )}
              <div className="w-24pxr h-24pxr bg-[#B2B2B3] rounded-full flex justify-center items-center absolute bottom-1 right-1 shadow-default">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 17.0144C13.1256 17.0144 14.0782 16.6255 14.8577 15.8478C15.6372 15.07 16.0269 14.1166 16.0269 12.9875C16.0269 11.8651 15.6372 10.9141 14.8577 10.1346C14.0782 9.35516 13.1256 8.96542 12 8.96542C10.8744 8.96542 9.92262 9.35516 9.14474 10.1346C8.36686 10.9141 7.97792 11.8651 7.97792 12.9875C7.97792 14.1166 8.36686 15.07 9.14474 15.8478C9.92262 16.6255 10.8744 17.0144 12 17.0144ZM11.9963 15.6154C11.2539 15.6154 10.6317 15.3633 10.1298 14.8592C9.62789 14.355 9.37694 13.7328 9.37694 12.9926C9.37694 12.2524 9.62799 11.6294 10.1301 11.1234C10.6322 10.6174 11.2546 10.3644 11.9973 10.3644C12.74 10.3644 13.3641 10.6174 13.8696 11.1234C14.3752 11.6294 14.6279 12.2524 14.6279 12.9926C14.6279 13.7328 14.3749 14.355 13.869 14.8592C13.363 15.3633 12.7388 15.6154 11.9963 15.6154ZM4.40659 20.2981C3.93404 20.2981 3.5318 20.1321 3.19987 19.8002C2.86793 19.4682 2.70197 19.0657 2.70197 18.5927V7.39487C2.70197 6.9218 2.86793 6.5193 3.19987 6.18737C3.5318 5.85543 3.93474 5.68947 4.40869 5.68947H7.46254L8.76254 4.26447C8.91731 4.08818 9.10527 3.95036 9.32644 3.85101C9.54759 3.75165 9.78302 3.70197 10.0327 3.70197H13.9721C14.2177 3.70197 14.4513 3.75165 14.6729 3.85101C14.8945 3.95036 15.0843 4.08818 15.2423 4.26447L16.5375 5.68947H19.5913C20.0653 5.68947 20.4682 5.85543 20.8002 6.18737C21.1321 6.5193 21.2981 6.9218 21.2981 7.39487V18.5927C21.2981 19.0657 21.1321 19.4682 20.8002 19.8002C20.4682 20.1321 20.066 20.2981 19.5934 20.2981H4.40659Z"
                    fill="#fff"
                  />
                </svg>
              </div>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              aria-labelledby="dropzone-file"
              onChange={onSelectImage}
            />
          </label>
          <NicknameComponent placeholder={randomName} />
        </div>
      </div>
      <Footer>
        <ProgressBar init={66} progress={100} />
        <FooterButton
          buttonCase="large"
          text={['시작하기']}
          route={[goToComplete]}
          isActive={isNicknameValid}
          onClickOne={handleClick}
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
