import { useState } from "react";
import { useAtom } from "jotai";
import { passwordAtom } from "@/pages";

const labelFocusWithin = 'text-black';
const labelFocusWithout = 'text-gray-500';


function pwReg(text: string) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

interface PasswordComponentProps {
  onValidationChange?: (isValid: boolean) => void;
}

export function PasswordComponent({onValidationChange} : PasswordComponentProps) {
  const [pwBorder, setPwBorder] = useState('');
  const [password, setPassword] = useAtom(passwordAtom);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  function validatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const isValid = pwReg(e.target.value);
    setPassword(e.target.value);
    setPwBorder(isValid ? '' : 'border-warning border');
    onValidationChange?.(isValid); // 유효성 검사 결과 전달
  }

  return (
    <>
      <label
        htmlFor="password-input"
        className={`mb-8pxr ml-2pxr text-foot-em ${isPasswordFocused ? labelFocusWithin : labelFocusWithout}`}
      >
        비밀번호
      </label>
      <input
        id="password-input"
        type="password"
        className={`w-full h-48pxr py-0 px-10pxr bg-gray_150  rounded-md ${pwBorder} focus:outline-primary`}
        placeholder="비밀번호를 입력해주세요"
        onChange={validatePassword}
        value={password}
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
      />
      <div className="h-30pxr">
        <p
          className={`text-cap-1 text-warning ${pwBorder ? 'block' : 'hidden'}`}
        >
          영어 대소문자, 특수문자, 숫자 포함 12자리 이상 입력해주세요
        </p>
      </div>
    </>
  )
}

export function PasswordConfirmComponent ({onValidationChange} : PasswordComponentProps) {
  const [isPasswordConfirmFocused, setIsPasswordConfirmFocused] = useState(false);
  const [password, setPassword] = useAtom(passwordAtom);
  const [confirmBorder, setConfirmBorder] = useState('');
  
  function pwConfirm(e: React.ChangeEvent<HTMLInputElement>) {
    const isValid = e.target.value === password;
    if (isValid) {
      setConfirmBorder('');
      onValidationChange?.(true); // 패스워드가 일치하면 true 전달
    } else {
      setConfirmBorder('border-warning border');
      onValidationChange?.(false); // 패스워드가 일치하지 않으면 false 전달
    }
  }


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
        onFocus={() => setIsPasswordConfirmFocused(true)}
        onBlur={() => setIsPasswordConfirmFocused(false)}
      />
      <div className="h-228pxr">
        <p
          className={`text-cap-1 text-warning ${confirmBorder ? 'block' : 'hidden'}`}
        >
          입력하신 비밀번호가 일치하지 않습니다
        </p>
      </div>
    </>
  )
}