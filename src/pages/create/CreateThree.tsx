import { Header, FooterButton, Footer } from '@/components';
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

  return (
    <div className="flex flex-col h-full">
      <Header option="titleWithClose" title="레시피 스탭 추가하기" />
      <div className="flex flex-col px-16pxr pt-14pxr grow w-full gap-42pxr pb-120pxr">
        <FileInput inputTitle="단계 이미지" handleInput={handleFileInput} preview={preview} />
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
          text={['이전', '완료']}
          route={[() => '/create', () => '../two']}
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
              alert('이미지를 추가 해주세요!');
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
    </div>
  );
}
