import { Header, Button } from "@/components"
import { TextAreaComponent, FileInputComponent } from "./components/";
import { useAtom } from "jotai";
import { useState } from 'react';
import { recipeSteps, temp_image } from '@/stores/stores';
import { Link } from "react-router-dom";
import { getRandomId } from "@/util/math/getRandomId";


export function CreateThree() {
  const [steps, setSteps] = useAtom(recipeSteps);
  const [description, setDescription] = useState('');
  const [tips, setTips] = useState('');
  const [image, setImage] = useAtom(temp_image);


  return (
    <div className="flex flex-col h-full">
      <Header option="titleWithClose" title="레시피 스탭 추가하기" />
      <div className="flex flex-col px-16pxr py-14pxr grow w-full gap-42pxr">
        <FileInputComponent inputTitle="단계 이미지" setFile={setImage}/>
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
          onClick={async () => {
            const id = getRandomId();
            const reader = new FileReader();
            const readerPromise = new Promise((resolve) => {
              reader.onloadend = () => {
                resolve(reader.result);
              };
            });
            reader.readAsDataURL(image);
            const imageURL = await readerPromise;
            const stepsData = new FormData();
            stepsData.append('id', id);
            stepsData.append('image', imageURL);
            stepsData.append('description', description);
            stepsData.append('tips', tips);
            setSteps(JSON.stringify([...JSON.parse(steps), Object.fromEntries(stepsData)])) 
          }}>완료
        </Link>
      </footer>
    </div>
  )
}

