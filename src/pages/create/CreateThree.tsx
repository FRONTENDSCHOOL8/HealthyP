import { InputComponent, Header, Button } from "@/components"
import { useAtom } from "jotai";
import React, { useState, useEffect } from 'react';
import { recipeSteps } from ".";
import { Link } from "react-router-dom";

interface TextAreaProps {
  inputTitle : string;
  maxCharCount : number;
  requiredText? : string;
  setData : React.Dispatch<React.SetStateAction<string>>;
}


function TextAreaComponent({ inputTitle, requiredText, maxCharCount, setData }: TextAreaProps) {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(text.length);
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    if (newText.length <= maxCharCount) {
      setText(newText);
    }
  };

  return (
    <div>
      <label htmlFor="text-area" className="text-sub-em flex flex-col gap-10pxr">
        <p>
          {inputTitle}
          <span className="text-sub">{requiredText}</span>
        </p>
        <textarea
          id="text-area"
          placeholder="요리 설명을 작성해주세요"
          className="w-full h-120pxr py-8pxr px-10pxr bg-gray_150 rounded-md text-sub focus:outline-primary"
          value={text}
          onChange={(e) => {
            handleTextChange(e);
            setData(e.target.value);
          }}
        />
      </label>
        <p className="text-cap-1 text-gray-500 float-right">{`${charCount} / ${maxCharCount}`}</p>
    </div>
  );
}



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
            setSteps([...steps, {"image": '', "description": description, "tips": tips}]) 
          }}>완료
        </Link>
      </footer>
    </div>
  )
}