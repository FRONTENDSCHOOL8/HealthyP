import { memo, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import {
  passwordConfirmValid,
  passwordValid,
  passwordAtom,
} from '@/stores/stores';

const labelFocusWithin = 'text-black';
const labelFocusWithout = 'text-gray-500';

function pwReg(text: string) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

interface PasswordComponentProps {
  label?: boolean;
  error?: boolean;
  style?: string;
}

function PasswordComponent({ label, error, style }: PasswordComponentProps) {
  const [pwBorder, setPwBorder] = useState('');
  const [password, setPassword] = useAtom(passwordAtom);
  const [, setPasswordValid] = useAtom(passwordValid);
  const isPasswordFocused = useRef(false);

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = pwReg(e.target.value);
    setPassword(e.target.value);
    setPwBorder(isValid ? '' : 'border-warning border');
    setPasswordValid(isValid);
  };

  const handleFocus = () => {
    isPasswordFocused.current = true;
  };
  const handleBlur = () => {
    isPasswordFocused.current = false;
  };

  return (
    <>
      <label
        htmlFor="password-input"
        className={`mb-8pxr ml-2pxr text-foot-em ${isPasswordFocused ? labelFocusWithin : labelFocusWithout} ${label ? 'block' : 'hidden'}`}
      >
        비밀번호
      </label>
      <input
        id="password-input"
        type="password"
        className={`w-full h-48pxr py-0 px-10pxr bg-gray_150  rounded-md ${pwBorder} focus:outline-primary ${style}`}
        placeholder="비밀번호를 입력해주세요"
        onChange={validatePassword}
        value={password}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className={`h-30pxr ${error ? 'block' : 'hidden'}`}>
        <p
          className={`text-cap-1 text-warning ${pwBorder ? 'block' : 'hidden'}`}
        >
          영어 대소문자, 특수문자, 숫자 포함 12자리 이상 입력해주세요
        </p>
      </div>
    </>
  );
}

function PasswordConfirmComponent() {
  const [password] = useAtom(passwordAtom);
  const [confirmBorder, setConfirmBorder] = useState('');
  const [, setPasswordConfirmValid] = useAtom(passwordConfirmValid);
  const isPasswordConfirmFocused = useRef(false);

  const pwConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = e.target.value === password;
    if (isValid) {
      setConfirmBorder('');
      setPasswordConfirmValid(true); // 패스워드가 일치하면 true 전달
    } else {
      setConfirmBorder('border-warning border');
      setPasswordConfirmValid(false); // 패스워드가 일치하지 않으면 false 전달
    }
  };

  const handleFocus = () => {
    isPasswordConfirmFocused.current = true;
  };

  const handleBlur = () => {
    isPasswordConfirmFocused.current = false;
  };

  return (
    <>
      <label
        htmlFor="password-confirm-input"
        className={`mb-8pxr ml-2pxr text-foot-em ${isPasswordConfirmFocused ? labelFocusWithin : labelFocusWithout}`}
      >
        비밀번호 확인
      </label>
      <input
        id="password-confirm-input"
        type="password"
        className={`w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md ${confirmBorder} focus:outline-primary`}
        placeholder="비밀번호를 입력해주세요"
        onChange={pwConfirm}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="h-228pxr">
        <p
          className={`text-cap-1 text-warning ${confirmBorder ? 'block' : 'hidden'}`}
        >
          입력하신 비밀번호가 일치하지 않습니다
        </p>
      </div>
    </>
  );
}

export const MemoizedPasswordComponent = memo(PasswordComponent);
export const MemoizedPasswordConfirmComponent = memo(PasswordConfirmComponent);
