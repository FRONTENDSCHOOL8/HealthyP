import { InputComponent, Header, Button } from "@/components"
import React, { useState, useEffect } from 'react';

interface TextAreaProps {
  inputTitle : string;
  maxCharCount: number;
  requiredText? : string;
}

function TextAreaComponent({ inputTitle, requiredText, maxCharCount }: TextAreaProps) {
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
          onChange={handleTextChange}
        />
      </label>
        <p className="text-cap-1 text-gray-500 float-right">{`${charCount} / ${maxCharCount}`}</p>
    </div>
  );
}


export function CreateThree() {
  return (
    <div className="flex flex-col h-full">
      <Header option="titleWithClose" title="레시피 스탭 추가하기" />
      <div className="flex flex-col px-16pxr py-14pxr grow w-full gap-42pxr">
        <InputComponent option="fileInput" inputTitle="이미지" />
        <TextAreaComponent inputTitle="설명" requiredText=" (필수)" maxCharCount={400}/>
        <TextAreaComponent inputTitle="팁" maxCharCount={400}/>
      </div>
      <footer className="w-full px-14pxr pt-14pxr pb-46pxr bg-white">
        <Button
          buttonCase="medium"
          text={['이전', '완료']}
          route={[() => '/create', () => '../two']} />
      </footer>
    </div>
  )
}