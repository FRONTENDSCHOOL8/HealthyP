import { useState } from "react";


const labelFocusWithin = 'text-black';
const labelFocusWithout = 'text-gray-500';


function emailReg(text: string) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(text).toLowerCase());
}

interface EmailComponentProps {
  onValidationChange?: (isValid: boolean) => void;
}


export function EmailComponent({onValidationChange} : EmailComponentProps) {
  function validateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const isValid = emailReg(e.target.value);
    setEmailValue(e.target.value);
    setEmailBorder(isValid ? '' : 'border-warning border');
    onValidationChange?.(isValid);
  }


  const [emailBorder, setEmailBorder] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);


  return (
    <>
      <label
        htmlFor="email-input"
        className={`mb-8pxr ml-2pxr text-foot-em ${isEmailFocused ? labelFocusWithin : labelFocusWithout}`}
      >
        이메일
      </label>
      <input
        id="email-input"
        type="email"
        className={`w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md ${emailBorder} focus:outline-primary`}
        placeholder="이메일을 입력해주세요"
        value={emailValue}
        onChange={validateEmail}
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
      />
      <div className="h-30pxr">
        <p
          className={`text-cap-1 text-warning ${emailBorder ? 'block' : 'hidden'}`}
        >
          올바른 이메일 형식을 작성해주세요.
        </p>
      </div>
    </>
  )
}
