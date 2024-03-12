import { useAtom } from 'jotai';
import { title } from '@/stores/stores';
import { Required } from '@/components';
import { HTMLAttributes, useCallback } from 'react';

interface TitleProps extends HTMLAttributes<HTMLInputElement> {
  inputTitle: string;
  placeholder: string;
}

export default function Title({ inputTitle, placeholder }: TitleProps) {
  const [titleField, setTitleField] = useAtom(title);

  const titleInputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.value === '') return;
      setTitleField(e.target.value);
    },
    [setTitleField]
  );

  return (
    <>
      <label htmlFor="nickname-input" className="text-sub-em flex flex-col gap-10pxr">
        <p className="text-sub-em">
          {inputTitle}
          <Required />
        </p>
        <input
          value={titleField}
          id="nickname-input"
          type="text"
          className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md text-sub focus:outline-primary"
          placeholder={placeholder}
          onChange={titleInputHandler}
        />
      </label>
    </>
  );
}
