import { useSetAtom } from "jotai";
import { title } from "@/stores/stores";


interface TitleComponent {
  inputTitle: string;
  placeholder: string;
}

export function TitleComponent({inputTitle, placeholder} : TitleComponent) {

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
          className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md text-sub"
          placeholder={placeholder}
          onChange={titleInputHandler}
        />
      </label>
    </>
  )
}