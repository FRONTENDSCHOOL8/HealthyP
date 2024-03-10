import { Header, FooterButton, Footer } from '@/components';
import { TextAreaComponent, FileInputComponent } from './components';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { recipeSteps, temp_image } from '@/stores/stores';
import { useNavigate } from 'react-router-dom';
import { getRandomId } from '@/util/math/getRandomId';

export function CreateThree() {
  const [steps, setSteps] = useAtom(recipeSteps);
  const [description, setDescription] = useState('');
  const [tips, setTips] = useState('');
  const [image, setImage] = useAtom(temp_image);

  const navigate = useNavigate();
  const goToTwo = () => {
    return './../two';
  };
  const path: string = goToTwo();

  return (
    <div className="flex flex-col h-full">
      <Header option="titleWithClose" title="레시피 스탭 추가하기" />
      <div className="flex flex-col px-16pxr py-14pxr grow w-full gap-42pxr">
        <FileInputComponent inputTitle="단계 이미지" setFile={setImage} />
        <TextAreaComponent
          inputTitle="설명"
          requiredText=" (필수)"
          maxCharCount={400}
          setData={setDescription}
          placeholderText="요리 설명을 작성해주세요"
        />
        <TextAreaComponent
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
            const reader = new FileReader();
            const readerPromise = new Promise((resolve) => {
              reader.onloadend = () => {
                resolve(reader.result);
              };
            });

            if (image) {
              reader.readAsDataURL(image);
              const imageURL = await readerPromise;
              const stepsData = new FormData();
              stepsData.append('id', id);
              stepsData.append('image', imageURL as Blob | string);
              stepsData.append('description', description);
              stepsData.append('tips', tips);
              setSteps(
                JSON.stringify([
                  ...JSON.parse(steps),
                  Object.fromEntries(stepsData),
                ])
              );

              navigate(path);
            } else {
              alert('이미지를 추가 해주세요!');
            }
          }}
        />
      </Footer>
    </div>
  );
}
