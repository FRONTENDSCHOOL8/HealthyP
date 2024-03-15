import { Required } from '@/components';
import { TextInputProps } from '../create';
import { useRef } from 'react';
import { ErrorMessage } from '.';

const inputStyle = 'bg-gray_150 rounded-[7px] px-10pxr py-8pxr placeholder:text-500';

export default function TextInput({
  required = true,
  placeholder,
  as: CompoName,
  title,
  type,
  id,
  maxLength,
  error,
  register,
  registerName,
}: TextInputProps) {
  const spanRef: React.MutableRefObject<HTMLSpanElement | null> = useRef(null);
  return (
    <div className="relative flex flex-col">
      <label htmlFor={id} className="text-body-em mb-10pxr">
        {title}
        {required && <Required />}
      </label>
      <CompoName
        id={id}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        min={1}
        className={`${inputStyle} ${CompoName === 'textarea' && 'h-132pxr'}`}
        onInput={(e) => {
          if (spanRef.current)
            spanRef.current.innerText = `${(e.target as HTMLInputElement).value.length}/${maxLength}`;
        }}
        {...register(registerName)}
      />
      <span className="text-sub text-gray_500 self-end absolute bottom-[-1.25rem]" ref={spanRef}>
        0/{maxLength}
      </span>
      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  );
}
