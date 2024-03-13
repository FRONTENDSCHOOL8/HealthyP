import { Required } from '@/components';
import { TextInputProps } from './create';
import { useRef } from 'react';
import { ErrorMessage } from '.';

const inputStyle = 'bg-gray_150 rounded-[7px] px-10pxr py-8pxr placeholder:text-500';

export default function TextInput({
  height,
  placeholder,
  as: CompoName,
  title,
  id,
  maxLength,
  error,
  register,
  registerName,
}: TextInputProps) {
  const spanRef: React.MutableRefObject<HTMLSpanElement | null> = useRef(null);
  return (
    <div>
      <label htmlFor={id} className="text-body-em">
        {title}
        <Required />
      </label>
      <CompoName
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
        className={inputStyle}
        height={height}
        onInput={(e) => {
          if (spanRef.current)
            spanRef.current.innerText = `${(e.target as HTMLInputElement).value.length}/${maxLength}`;
        }}
        {...register(registerName)}
      />
      <span ref={spanRef}>0/{maxLength}</span>
      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  );
}
