import { useAtom } from "jotai";
import { useState } from "react";
import { passwordAtom } from "@/pages";
interface InputProps {
  option: "search" | "email" | "password" | "nickname" | "passwordConfirm";
  placeholder?: string;
  bgColor?: string;
  changeHandler?: () => void;
}

function pwReg(text:string){
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

export default function InputComponent({option, placeholder, bgColor} : InputProps) {
  const [pwBorder, setPwBorder] = useState('');
  const [confirmBorder, setConfirmBorder] = useState('');
  const [password, setPassword] = useAtom(passwordAtom);

  function pwConfirm(e: React.ChangeEvent<HTMLInputElement>) {
    if(e.target.value === password) {
      setConfirmBorder('');
      return;
    } else {
      setConfirmBorder('border-warning border'); 
    }
  }

  function validatePassword(e : React.ChangeEvent<HTMLInputElement>) {
    if(!pwReg(e.target.value)) {
      setPassword(e.target.value)
      setPwBorder('border-warning border');
    } else if (pwReg(e.target.value)) {
      setPassword(e.target.value)
      setPwBorder('');
    } else if (e.target.value === "") {
      setPassword(e.target.value)
      setPwBorder('');
    }
  }

  const inputMappings = {
    search: (
      <>
        <label htmlFor="search-input" className="sr-only">검색</label>
        <input id="search-input" className={`basis-full h-36pxr py-0 px-10pxr bg-gray_150 ${bgColor} rounded-md focus:outline-primary`} type="text" placeholder="재료, 해시태그, 요리로 검색해주세요" />
      </>
    ),
    email: (
      <>
        <label htmlFor="email-input" className="text-gray-500 text-foot-em">이메일
          <input id="email-input" type="email" className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md focus:outline-primary" placeholder="이메일을 입력해주세요" />
        </label>
      </>
    ),
    password: (
      <>
        <label htmlFor="password-input" className="text-gray-500 text-foot-em">비밀번호
          <input id="password-input" 
          type="password" 
          className={`w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md ${pwBorder} focus:outline-primary`} 
          placeholder="비밀번호를 입력해주세요" 
          onChange={validatePassword} />
          <p className={`text-cap-1 text-warning ${pwBorder ? 'block' : 'hidden'}`}>영어 대소문자, 특수문자, 숫자 포함 12자리 이상 입력해주세요</p>
        </label>
      </>
    ),
    passwordConfirm: (
      <>
        <label htmlFor="password-confirm-input" className="text-gray-500 text-foot-em">비밀번호 확인
          <input id="password-confirm-input" 
          type="password" 
          className={`w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md ${confirmBorder} focus:outline-primary`} 
          placeholder="비밀번호를 입력해주세요" 
          onChange={pwConfirm}/>
          <p className={`text-cap-1 text-warning ${confirmBorder ? 'block' : 'hidden'}`}>입력하신 비밀번호가 일치하지 않습니다</p>
        </label>
      </>
    ),
    nickname: (
      <>
        <label htmlFor="nickname-input" className="text-gray-500 text-foot-em">닉네임
          <input id="nickname-input" type="text" className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md" placeholder={placeholder} />
        </label>
      </>
    )
  }
  const inputComponent = inputMappings[option];

  if(inputComponent) {
    return inputComponent;
  }
  
  console.warn(`Unhandled option: ${option}`);
  return null;
}
