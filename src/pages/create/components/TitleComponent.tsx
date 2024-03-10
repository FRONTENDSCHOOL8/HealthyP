import { useSetAtom } from "jotai";
import { title, keywords } from "@/stores/stores";


interface InputComponent {
  inputTitle: string;
  placeholder: string;
}

export function TitleComponent({inputTitle, placeholder} : InputComponent) {

  const setTitleField = useSetAtom(title);

  function titleInputHandler(e : React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.value === "") return;
    setTitleField(e.target.value);
  }

  return (
    <>
      <label
        htmlFor="nickname-input"
        className="text-sub-em flex flex-col gap-10pxr"
      >
        <p className='text-sub-em'>{inputTitle}<span className='text-sub'>{' (필수)'}</span></p>
        <input
          id="nickname-input"
          type="text"
          className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md text-sub focus:outline-primary"
          placeholder={placeholder}
          onChange={titleInputHandler}
        />
      </label>
    </>
  )
}


export function KeywordComponent({inputTitle, placeholder} : InputComponent) {

  const setKeywords = useSetAtom(keywords);

  function titleInputHandler(e : React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.value === "") return;
    setKeywords(e.target.value);
  }

  return (
    <>
      <label
        htmlFor="nickname-input"
        className="text-sub-em flex flex-col gap-10pxr"
      >
        <p className='text-sub-em'>{inputTitle}</p>
        <input
          id="nickname-input"
          type="text"
          className="w-full h-48pxr py-0 px-10pxr bg-gray_150 focus:outline-primary rounded-md text-sub"
          placeholder={placeholder}
          onChange={titleInputHandler}
        />
      </label>
    </>
  )
}