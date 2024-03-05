import { useEffect, useState } from "react";


export default function TextAreaComponent({ inputTitle, requiredText, maxCharCount, setData }: TextAreaProps) {
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