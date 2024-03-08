import { Header, FooterButton, Footer } from '@/components';
import {
  FileInputComponent,
  TextAreaComponent,
  IngredientsComponent,
  TitleComponent,
  KeywordComponent,
  CategoryDropdown
} from './components/';
import { useSetAtom } from 'jotai';
import { Form } from 'react-router-dom';
import { ingredients, image, seasoning, description } from '@/stores/stores';

export function CreateOne() {
  const setImageFile = useSetAtom(image);
  const setDescription = useSetAtom(description);

  return (
    <>
      <Header option="titleWithClose" title="레시피 등록하기" />
      <Form
        action="two"
        className="px-20pxr py-20pxr flex flex-col gap-42pxr pb-120pxr bg-white"
      >
        <FileInputComponent
          inputTitle={'레시피 이미지'}
          setFile={setImageFile}
        />
        <TitleComponent inputTitle="레시피 제목" placeholder="레시피 제목" />
        <CategoryDropdown />
        <KeywordComponent inputTitle="키워드" placeholder="키워드는 쉼표(,) 로 구별해주세요" />
        <TextAreaComponent
          inputTitle="레시피 설명"
          maxCharCount={200}
          requiredText=" (필수)"
          setData={setDescription}
        />
        <IngredientsComponent 
          titleText="재료" 
          atom={ingredients}
          namePlaceholder='감자'
          amountPlaceholder='100g, 1개' />
        <IngredientsComponent 
          titleText="양념" 
          atom={seasoning}
          namePlaceholder='간장'
          amountPlaceholder='2스푼' />
      </Form>
      <Footer>
        <FooterButton
          buttonCase="large"
          text={['다음']}
          route={[() => 'two']}
        />
      </Footer>
    </>
  );
}
