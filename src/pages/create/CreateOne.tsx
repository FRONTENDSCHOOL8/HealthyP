import { Header, Button } from "@/components"
import { FileInputComponent, TextAreaComponent, IngredientsComponent, TitleComponent } from "./components/";
import { useSetAtom } from "jotai";
import { Form } from "react-router-dom"
import { ingredients, image, seasoning, description } from "@/stores/stores";

export function CreateOne() {
  const setImageFile = useSetAtom(image);
  const setDescription = useSetAtom(description)

  return (
    <>
      <Header option="titleWithClose" title="레시피 등록하기" />
      <Form action='two' className='px-20pxr py-20pxr flex flex-col gap-42pxr pb-120pxr'>
        <FileInputComponent inputTitle={"레시피 이미지"} setFile={setImageFile}/>
        <TitleComponent inputTitle="레시피 제목" placeholder="레시피 제목" />
        <TextAreaComponent inputTitle="레시피 설명" maxCharCount={400} requiredText=" (필수)" setData={setDescription}/>
        <IngredientsComponent titleText="재료" atom={ingredients} />
        <IngredientsComponent titleText="양념" atom={seasoning} />
        <footer className="fixed bottom-0 left-0 w-full px-18pxr py-30pxr bg-white">
          <Button
            buttonCase="large"
            text={['다음']}
            route={[() => 'two']} />
        </footer>
      </Form>
      
    </>
  )
}