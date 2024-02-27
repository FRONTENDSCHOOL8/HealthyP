interface InputProps {
  option: "search" | "email" | "password" | "nickname";
  placeholder?: string;
  bgColor?: string;
  changeHandler?: () => void;
}

export default function InputComponent({option, placeholder, bgColor, changeHandler} : InputProps) {
  const inputMappings = {
    search: (
      <>
        <label htmlFor="search-input" className="sr-only">검색</label>
        <input id="search-input" className={`w-full h-36pxr py-0 px-10pxr bg-gray_150 ${bgColor} rounded-md`} type="text" placeholder="재료, 해시태그, 요리로 검색해주세요" />
      </>
    ),
    email: (
      <>
        <label htmlFor="email-input" className="sr-only">이메일</label>
        <input id="email-input" type="email" className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md" placeholder="이메일을 입력해주세요" />
      </>
    ),
    password: (
      <>
        <label htmlFor="password-input" className="sr-only">비밀번호</label>
        <input id="password-input" type="password" className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md" placeholder="비밀번호를 입력해주세요" onChange={changeHandler}/>
      </>
    ),
    nickname: (
      <>
        <label htmlFor="nickname-input" className="sr-only">닉네임</label>
        <input id="nickname-input" type="text" className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md" placeholder={placeholder} />
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
