import { SetStateAction } from "jotai";
import { useState } from "react";

type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

interface FileInputComponentProps {
  inputTitle: string;
  setFile: SetAtom<[SetStateAction<File | null>], void | SetStateAction<[SetStateAction<File | null>]>>
}

export function FileInputComponent({inputTitle, setFile} : FileInputComponentProps) {
  
  const [preview, setPreview] = useState<string | undefined>('');
  
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    
    if(selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      setFile(selectedFile);
    }
  }

  return (

  <>
    <label
      htmlFor="dropzone-file"
      className="text-sub-em flex flex-col gap-10pxr"
    >
      <p className="inline-block">
        {inputTitle}
        <span className="text-sub">{' (필수)'}</span>
      </p>
      <div className="h-180pxr w-full bg-gray_150 hover:bg-gray_150 flex justify-center items-center hover:fill-gray-500 fill-gray-400 rounded-lg overflow-hidden">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={preview ? 'hidden' : 'block'}
        >
          <circle cx="12" cy="12" r="9.75" className="fill-inherit" />
          <path
            d="M11.351 12.6365H6.35099C6.16711 12.6365 6.01297 12.5748 5.88857 12.4513C5.76417 12.3278 5.70197 12.1732 5.70197 11.9874C5.70197 11.8016 5.76417 11.647 5.88857 11.5236C6.01297 11.4002 6.16711 11.3385 6.35099 11.3385H11.351V6.33848C11.351 6.15459 11.4134 6.00045 11.5382 5.87605C11.663 5.75165 11.8176 5.68945 12.0021 5.68945C12.1866 5.68945 12.3406 5.75165 12.4639 5.87605C12.5873 6.00045 12.649 6.15459 12.649 6.33848V11.3385H17.649C17.8329 11.3385 17.9871 11.4009 18.1115 11.5258C18.2359 11.6507 18.2981 11.8054 18.2981 11.99C18.2981 12.1774 18.2359 12.332 18.1115 12.4538C17.9871 12.5756 17.8329 12.6365 17.649 12.6365H12.649V17.6365C12.649 17.8232 12.5866 17.9781 12.4618 18.1011C12.337 18.2241 12.1824 18.2856 11.9979 18.2856C11.8134 18.2856 11.6595 18.2241 11.5361 18.1011C11.4127 17.9781 11.351 17.8232 11.351 17.6365V12.6365Z"
            fill="white"
          />
        </svg>
        <img
          src={preview ? preview : ''}
          alt=""
          className={`object-cover h-full w-full ${preview ? 'block' : 'hidden'}`}
        />
      </div>
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={onSelectFile}
      />
    </label>
      </>
  )
}
