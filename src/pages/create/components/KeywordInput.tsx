import { useAtom } from 'jotai';
import { keywords } from '@/stores/stores';
import { ChangeEvent, HTMLAttributes, useCallback } from 'react';

interface KeywordInputProps extends HTMLAttributes<HTMLInputElement> {
  inputTitle: string;
  placeholder: string;
}

export default function KeywordInput({ inputTitle, placeholder }: KeywordInputProps) {
  const [keywordsText, setKeywords] = useAtom(keywords);

  const titleInputHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.value === '') return;
      setKeywords(e.target.value);
    },
    [setKeywords]
  );

  return (
    <>
      <label htmlFor="nickname-input" className="text-sub-em flex flex-col gap-10pxr">
        <p className="text-sub-em">{inputTitle}</p>
        <input
          value={keywordsText}
          id="nickname-input"
          type="text"
          className="w-full h-48pxr py-0 px-10pxr bg-gray_150 focus:outline-primary rounded-md text-sub"
          placeholder={placeholder}
          onChange={titleInputHandler}
        />
      </label>
    </>
  );
}
