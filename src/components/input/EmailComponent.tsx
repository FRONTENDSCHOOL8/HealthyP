import { emailAtom, emailValid } from '@/stores/stores';
import { useAtom } from 'jotai';
import { memo, useRef, useState } from 'react';

const labelFocusWithin = 'text-black';
const labelFocusWithout = 'text-gray-500';
const warning = 'border-warning border';

function emailReg(text: string) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(text).toLowerCase());
}

interface EmailComponentProps {
  label?: boolean;
  error?: boolean;
  style?: string;
}

function EmailComponent({ label, error, style }: EmailComponentProps) {
  const [, setEmailValid] = useAtom(emailValid);

  const handleValidateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = emailReg(e.target.value);
    setEmailValue(e.target.value);
    setEmailBorder(isValid ? '' : warning);
    setEmailValid(isValid);
  };

  const [emailBorder, setEmailBorder] = useState('');
  const [emailValue, setEmailValue] = useAtom(emailAtom);
  const isEmailFocused = useRef(false);

  const handleFocus = () => {
    isEmailFocused.current = true;
  };

  const handleBlur = () => {
    isEmailFocused.current = false;
  };

  return (
    <>
      <label
        htmlFor="email-input"
        className={`mb-8pxr ml-2pxr text-foot-em ${isEmailFocused ? labelFocusWithin : labelFocusWithout} ${label ? 'block' : 'hidden'}`}
      >
        이메일
      </label>
      <input
        id="email-input"
        type="email"
        className={`w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md ${emailBorder} focus:outline-primary ${style}`}
        placeholder="이메일을 입력해주세요"
        value={emailValue}
        onChange={handleValidateEmail}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className={`h-30pxr ${error ? 'block' : 'hidden'}`}>
        <p
          className={`text-cap-1 text-warning ${emailBorder ? 'block' : 'hidden'}`}
        >
          올바른 이메일 형식을 작성해주세요.
        </p>
      </div>
    </>
  );
}

export const MemoizedEmailComponent = memo(EmailComponent);
