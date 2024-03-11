import { Header, FooterButton, Footer } from '@/components';
import { useState } from 'react';
import {
  FileInputComponent,
  TextAreaComponent,
  IngredientsComponent,
  TitleComponent,
  KeywordComponent,
  CategoryDropdown,
  TimeComponent,
  DifficultyComponent,
} from './components/';
import { OneButtonModal } from '@/components/modal/OneButtonModal';
import { useSetAtom } from 'jotai';
import { Form, useNavigate } from 'react-router-dom';
import { ingredients, image, seasoning, description } from '@/stores/stores';
import { TwoButtonModal } from '@/components/modal/TwoButtonModal';

export function CreateOne() {
  const setImageFile = useSetAtom(image);
  const setDescription = useSetAtom(description);
  const [preview, setPreview] = useState('');
  const [sizeAlert, setSizeAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setPreview('');
      return;
    }
    if (selectedFile && selectedFile.size < 5242880) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      setImageFile(selectedFile);
    } else if (selectedFile.size > 5242880) {
      setPreview('');
      setSizeAlert(true);
    }
  }

  const handleHeaderClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleConfirm = () => {
    navigate('/');
  };

  return (
    <>
      <Header option="titlewithCloseAndFn" title="레시피 등록하기" handleClick={handleHeaderClick} />
      <Form action="two" className="px-20pxr py-20pxr flex flex-col gap-42pxr pb-120pxr bg-white">
        <FileInputComponent inputTitle={'레시피 이미지'} fileInputListener={handleFileInput} preview={preview} />
        <TitleComponent inputTitle="레시피 제목" placeholder="레시피 제목" />

        <TimeComponent />
        <DifficultyComponent />

        <CategoryDropdown />
        <KeywordComponent inputTitle="키워드" placeholder="키워드는 쉼표(,) 로 구별해주세요" />
        <TextAreaComponent
          inputTitle="레시피 소개"
          maxCharCount={200}
          requiredText=" (필수)"
          setData={setDescription}
          placeholderText="이 레시피를 소개하는 글을 작성해주세요"
        />
        <IngredientsComponent
          titleText="재료"
          atom={ingredients}
          namePlaceholder="감자"
          amountPlaceholder="100g, 1개"
        />
        <IngredientsComponent titleText="양념" atom={seasoning} namePlaceholder="간장" amountPlaceholder="2스푼" />
      </Form>
      <Footer>
        <FooterButton buttonCase="large" text={['다음']} route={[() => 'two']} />
      </Footer>
      <OneButtonModal
        isOpen={sizeAlert}
        confirmModal={() => {
          setSizeAlert(false);
        }}
        titleText="파일 크기 초과!"
        firstLineText="5MB 이하 파일을 선택해주세요"
      />
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
