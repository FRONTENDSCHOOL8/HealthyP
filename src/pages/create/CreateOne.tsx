// packages
import { useAtom } from 'jotai';
import { Form, useNavigate } from 'react-router-dom';
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';

// components
import { Header, FooterButton, Footer, OneButtonModal, TwoButtonModal } from '@/components';
import { Ingredients, Time, SelectBox, Title, TextArea, FileInput, KeywordInput } from './components/';

// stores
import { ingredients, image, seasoning, description, difficulty, category } from '@/stores/stores';

// Selectbox array lists
const categories = ['건강식', '다이어트', '벌크업', '비건'];
const difficult = ['쉬움', '보통', '어려움'];

export function CreateOne() {
  const [imageFile, setImageFile] = useAtom(image);
  const [descriptionText, setDescription] = useAtom(description);
  const [difficultyText, setDifficulty] = useAtom(difficulty);
  const [categoryText, setCategory] = useAtom(category);
  // const [preview, setPreview] = useState('');
  const [sizeAlert, setSizeAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleFileInput: ChangeEventHandler<HTMLInputElement> | undefined = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;

      if (selectedFile && selectedFile.size < 5242880) {
        // const objectUrl = URL.createObjectURL(selectedFile);
        // setPreview(objectUrl);
        setImageFile(selectedFile);
      } else if (selectedFile.size > 5242880) {
        // setPreview('');
        setSizeAlert(true);
      }
    },
    [setImageFile]
  );

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
      <Form action="two" className="px-14pxr py-20pxr flex flex-col gap-42pxr pb-120pxr bg-white">
        <FileInput inputTitle={'레시피 이미지'} handleInput={handleFileInput} data={imageFile} preview="" required />
        <Title inputTitle="레시피 제목" placeholder="레시피 제목" />
        <TextArea
          inputTitle="레시피 소개"
          maxCharCount={200}
          setData={setDescription}
          data={descriptionText}
          placeholderText="이 레시피를 소개하는 글을 작성해주세요"
          required
        />
        <Time />
        <SelectBox
          id="category"
          data={categoryText}
          dataArr={categories}
          label="카테고리"
          required
          onChange={(e) => setCategory((e.target as HTMLSelectElement).value)}
        />
        <SelectBox
          id="difficulty"
          data={difficultyText}
          dataArr={difficult}
          label="난이도"
          required
          onChange={(e) => setDifficulty((e.target as HTMLSelectElement).value)}
        />
        <KeywordInput inputTitle="키워드" placeholder="키워드는 쉼표(,) 로 구별해주세요" />
        <Ingredients
          titleText="재료"
          atom={ingredients}
          namePlaceholder="감자"
          amountPlaceholder="100g, 1개"
          required
        />
        <Ingredients titleText="양념" atom={seasoning} namePlaceholder="간장" amountPlaceholder="2스푼" />
      </Form>
      <Footer>
        <FooterButton buttonCase="large" text={['다음']} route={[() => 'two']} isAnimated={false} />
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
