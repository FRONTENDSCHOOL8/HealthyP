import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";

interface TextAreaProps {
  inputTitle? : string;
  maxCharCount : number;
  requiredText? : string;
  setData : Dispatch<SetStateAction<string>>;
  placeholderText : string;
}

export function TextAreaComponent({ inputTitle, requiredText, maxCharCount, setData, placeholderText }: TextAreaProps) {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(text.length);
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxCharCount) {
      setText(newText);
      setData(newText)
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="text-area" className="text-sub-em flex flex-col gap-10pxr">
        {inputTitle? <p>
          {inputTitle}
          <span className="text-sub">{requiredText}</span>
        </p> : <></>}
        <textarea
          id="text-area"
          placeholder={placeholderText}
          className="w-full h-120pxr py-8pxr px-10pxr bg-gray_150 rounded-md text-sub focus:outline-primary"
          value={text}
          onChange={handleTextChange}
        />
      </label>
        <p className="text-cap-1 text-gray-500 float-right">{`${charCount} / ${maxCharCount}`}</p>
    </div>
  );
}