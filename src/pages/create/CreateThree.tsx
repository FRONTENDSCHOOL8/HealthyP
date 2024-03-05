import { InputComponent, Header, Button, TextAreaComponent } from "@/components"
import { useAtom } from "jotai";
import { useState } from 'react';
import { recipeSteps } from ".";
import { Link } from "react-router-dom";


export function CreateThree() {
  const [steps, setSteps] = useAtom(recipeSteps);
  const [description, setDescription] = useState('');
  const [tips, setTips] = useState('');

  return (
    <div className="flex flex-col h-full">
      <Header option="titleWithClose" title="레시피 스탭 추가하기" />
      <div className="flex flex-col px-16pxr py-14pxr grow w-full gap-42pxr">
        <InputComponent option="fileInput" inputTitle="이미지" />
        <TextAreaComponent 
          inputTitle="설명" 
          requiredText=" (필수)" 
          maxCharCount={400} 
          setData={setDescription}/>
        <TextAreaComponent 
          inputTitle="팁" 
          maxCharCount={400}
          setData={setTips}/>
      </div>
      <footer className="w-full px-14pxr pt-14pxr pb-46pxr bg-white">
        <Button
          buttonCase="medium"
          text={['이전', '완료']}
          route={[() => '/create', () => '../two']} />
        <Link 
          to="../two" 
          className=" text-center w-full py-10pxr bg-primary text-white rounded-lg"
          onClick={() => {
            console.log(description, tips);
            // change image value to the image url
            setSteps(JSON.stringify([...JSON.parse(steps), {"image": '', "description": description, "tips": tips}])) 
            console.log(steps)
          }}>완료
        </Link>
      </footer>
    </div>
  )
}