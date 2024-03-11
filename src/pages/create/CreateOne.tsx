// packages
import { useSetAtom } from 'jotai';
import { Form } from 'react-router-dom';
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';

// components
import { Header, FooterButton, Footer, OneButtonModal } from '@/components';
import { Ingredients, Time, SelectBox, Title, TextArea, FileInput, KeywordInput } from './components/';

// stores
import { ingredients, image, seasoning, description, difficulty, category } from '@/stores/stores';

// Selectbox array lists
const categories = ['건강식', '다이어트', '벌크업', '비건'];
const difficult = ['쉬움', '보통', '어려움'];

export function CreateOne() {
  const setImageFile = useSetAtom(image);
  const setDescription = useSetAtom(description);
  const setDifficulty = useSetAtom(difficulty);
  const setCategory = useSetAtom(category);
  const [preview, setPreview] = useState('');
  const [sizeAlert, setSizeAlert] = useState(false);

  const handleFileInput: ChangeEventHandler<HTMLInputElement> | undefined = useCallback(() => {
    (e: ChangeEvent<HTMLInputElement>) => {
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
    };
  }, [setImageFile]);

  return (
    <>
      <Header option="titleWithClose" title="레시피 등록하기" />
      <Form action="two" className="px-14pxr py-20pxr flex flex-col gap-42pxr pb-120pxr bg-white">
        <FileInput inputTitle={'레시피 이미지'} handleInput={handleFileInput} preview={preview} />
        <Title inputTitle="레시피 제목" placeholder="레시피 제목" />
        <TextArea
          inputTitle="레시피 소개"
          maxCharCount={200}
          setData={setDescription}
          placeholderText="이 레시피를 소개하는 글을 작성해주세요"
        />
        <Time />
        <SelectBox
          id="category"
          dataArr={categories}
          label="카테고리"
          required
          onChange={(e) => setCategory((e.target as HTMLSelectElement).value)}
        />
        <SelectBox
          id="difficulty"
          dataArr={difficult}
          label="난이도"
          required
          onChange={(e) => setDifficulty((e.target as HTMLSelectElement).value)}
        />
        <KeywordInput inputTitle="키워드" placeholder="키워드는 쉼표(,) 로 구별해주세요" />

        <Ingredients titleText="재료" atom={ingredients} namePlaceholder="감자" amountPlaceholder="100g, 1개" />
        <Ingredients titleText="양념" atom={seasoning} namePlaceholder="간장" amountPlaceholder="2스푼" />
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
    </>
  );
}
