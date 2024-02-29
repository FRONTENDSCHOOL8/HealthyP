import { useAtom } from "jotai";
import { useState } from "react";
import { passwordAtom } from "@/pages";
interface InputProps {
  option: "search" | "email" | "password" | "nickname" | "passwordConfirm" | "fileInput";
  placeholder?: string;
  bgColor?: string;
  changeHandler?: () => void;
  inputTitle?: string;
}

function pwReg(text:string){
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

function useInputMapping({option, placeholder, bgColor, inputTitle} : InputProps) {
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
        <label htmlFor="nickname-input" className="text-sub-em flex flex-col gap-10pxr">닉네임
          <input id="nickname-input" type="text" className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md" placeholder={placeholder} />
        </label>
      </>
    ),
    fileInput: (
      <>
          <label htmlFor="dropzone-file" className="text-sub-em flex flex-col gap-10pxr">
            <p className="inline-block">{inputTitle}<span className="text-sub">{'(필수)'}</span></p>
            <div className="h-180pxr w-full bg-gray-300 hover:bg-gray-300 flex justify-center items-center hover:fill-gray-500 fill-gray-400 rounded-lg ">
              <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9.75" className="fill-inherit"/>
                <path d="M11.351 12.6365H6.35099C6.16711 12.6365 6.01297 12.5748 5.88857 12.4513C5.76417 12.3278 5.70197 12.1732 5.70197 11.9874C5.70197 11.8016 5.76417 11.647 5.88857 11.5236C6.01297 11.4002 6.16711 11.3385 6.35099 11.3385H11.351V6.33848C11.351 6.15459 11.4134 6.00045 11.5382 5.87605C11.663 5.75165 11.8176 5.68945 12.0021 5.68945C12.1866 5.68945 12.3406 5.75165 12.4639 5.87605C12.5873 6.00045 12.649 6.15459 12.649 6.33848V11.3385H17.649C17.8329 11.3385 17.9871 11.4009 18.1115 11.5258C18.2359 11.6507 18.2981 11.8054 18.2981 11.99C18.2981 12.1774 18.2359 12.332 18.1115 12.4538C17.9871 12.5756 17.8329 12.6365 17.649 12.6365H12.649V17.6365C12.649 17.8232 12.5866 17.9781 12.4618 18.1011C12.337 18.2241 12.1824 18.2856 11.9979 18.2856C11.8134 18.2856 11.6595 18.2241 11.5361 18.1011C11.4127 17.9781 11.351 17.8232 11.351 17.6365V12.6365Z" fill="white"/>
              </svg>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
      </>
    )
  }
  const inputComponent = inputMappings[option];

  if(inputComponent) {
    return inputComponent;
  }
}

export default function InputComponent({option, placeholder, bgColor, inputTitle} : InputProps) {
  const inputComponent = useInputMapping({option, placeholder, bgColor, inputTitle})


  if (!inputComponent) {
    console.warn(`Unhandled option: ${option}`);
  }
  return inputComponent;
}
