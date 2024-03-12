import { Header, FooterButton, Footer, TwoButtonModal } from '@/components';
import { FileInput, TextArea } from './components';
import { useAtom } from 'jotai';
import { ChangeEventHandler, useState } from 'react';
import { recipeSteps, step_images } from '@/stores/stores';
import { useNavigate } from 'react-router-dom';
import { getRandomId } from '@/util/math/getRandomId';
import { OneButtonModal } from '@/components/modal/OneButtonModal';

export function CreateThree() {
  const [steps, setSteps] = useAtom(recipeSteps);
  const [description, setDescription] = useState('');
  const [tips, setTips] = useState('');
  const [stepImages, setStepImages] = useAtom(step_images);
  const [preview, setPreview] = useState('');
  const [currImage, setCurrImage] = useState<File>();
  const [sizeAlert, setSizeAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  // async function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
  // async function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
  //   const selectedFile = e.target.files?.[0];
  //   if (!selectedFile) {
  //     setPreview('');
  //     return;
  //   }

  //   if (selectedFile) {
  //     const objectUrl = URL.createObjectURL(selectedFile);
  //     setPreview(objectUrl);
  //     setCurrImage(selectedFile);
  //     return;
  //   }

  // if(selectedFile && selectedFile.size < 5242880) {
  //   const objectUrl = URL.createObjectURL(selectedFile);
  //   setPreview(objectUrl);
  //   setCurrImage(selectedFile);
  // } else if(selectedFile.size > 5242880) {
  //   setPreview('');
  //   setSizeAlert(true);
  // }
  // }

  const handleFileInput: ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setPreview('');
      return;
    }
    if (selectedFile && selectedFile.size < 5242880) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      setCurrImage(selectedFile);
    } else if (selectedFile.size > 5242880) {
      setPreview('');
      setSizeAlert(true);
    }
  };

  const navigate = useNavigate();
  const goToTwo = () => {
    return './../two';
  };
  const path: string = goToTwo();

  const handleHeaderClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleConfirm = () => {
    navigate('../two');
  };

  return (
    <div className="flex flex-col h-full">
      <Header option="titlewithCloseAndFn" title="레시피 스탭 추가하기" handleClick={handleHeaderClick} />
      <div className="flex flex-col px-16pxr py-14pxr grow w-full gap-42pxr pb-120pxr">
        <FileInput inputTitle="단계 이미지" handleInput={handleFileInput} preview={preview} required />
        <TextArea
          required
          inputTitle="설명"
          maxCharCount={400}
          setData={setDescription}
          placeholderText="요리 설명을 작성해주세요"
        />
        <TextArea
          inputTitle="팁"
          maxCharCount={400}
          setData={setTips}
          placeholderText="요리할 때 주의사항이나 팁을 입력해주세요"
        />
      </div>
      <Footer>
        <FooterButton
          buttonCase="medium"
          text={['취소', '완료']}
          route={[() => '../two', () => '../two']}
          onClickOne={() => {
            setIsOpen(true);
          }}
          onClickTwo={async () => {
            const id = getRandomId();

            if (preview) {
              const stepsData = new FormData();
              if (currImage === null || currImage === undefined) return;
              setStepImages([...stepImages, currImage]);
              stepsData.append('id', id);
              stepsData.append('description', description);
              stepsData.append('tips', tips);
              setSteps(JSON.stringify([...JSON.parse(steps), Object.fromEntries(stepsData)]));
              navigate(path);
            } else {
              setIsAlert(true);
            }
          }}
        />
      </Footer>
      <OneButtonModal
        isOpen={sizeAlert}
        confirmModal={() => {
          setSizeAlert(false);
        }}
        titleText="파일 크기 초과!"
        firstLineText="5MB 이하 파일을 선택해주세요"
      />
      <OneButtonModal
        isOpen={isAlert}
        confirmModal={() => {
          setIsAlert(false);
        }}
        titleText="양식을 지켜주세요!"
        firstLineText="단계에 들어갈 사진을 꼭 넣어주세요!"
      />
      <TwoButtonModal
        isOpen={isOpen}
        headline="정말 나가시겠습니까?"
        where="이전 페이지"
        closeModal={handleClose}
        confirmModal={handleConfirm}
        isAnimated={false}
      />
    </div>
  );
}
