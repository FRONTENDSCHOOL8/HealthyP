import { Required } from '@/components';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useState, useEffect } from 'react';

interface TextAreaProps {
  inputTitle?: string;
  maxCharCount: number;
  requiredText?: string;
  data?: string;
  setData: Dispatch<SetStateAction<string>>;
  placeholderText: string;
  required?: boolean;
}

export default function TextArea({
  inputTitle,
  maxCharCount,
  setData,
  data,
  placeholderText,
  required = false,
}: TextAreaProps) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (data === undefined || data === null) return;
    setCharCount(data.length);
  }, [data]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      if (newText.length <= maxCharCount) {
        // setText(newText);
        setData(newText.replace(/\n/g, '<br>'));
      }
    },
    [maxCharCount, setData]
  );

  return (
    <div className="w-full">
      <label htmlFor="text-area" className="text-sub-em flex flex-col gap-10pxr">
        {inputTitle ? (
          <p>
            {inputTitle}
            {required && <Required />}
          </p>
        ) : (
          <></>
        )}
        <textarea
          id="text-area"
          placeholder={placeholderText}
          className="w-full h-120pxr py-8pxr px-10pxr bg-gray_150 rounded-md text-sub focus:outline-primary"
          value={data}
          onChange={handleTextChange}
        />
      </label>
      <p className="text-cap-1 text-gray-500 float-right">{`${charCount} / ${maxCharCount}`}</p>
    </div>
  );
}
