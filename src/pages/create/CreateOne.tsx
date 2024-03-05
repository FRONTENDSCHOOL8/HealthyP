import { Header, Button, FnButton } from "@/components"
import { useAtom } from "jotai";
import { useState } from "react"
import { Form } from "react-router-dom"
import { ingredients, image, title } from ".";

interface IngredientsProps {
  titleText: string;
}

function Ingredients({titleText} : IngredientsProps) {
  const [ingredName, setIngredName] = useState('');
  const [ingredAmount, setIngredAmount] = useState('');
  const [ingredientData, setIngredientData] = useAtom(ingredients);

  return (
    <div className="flex flex-col gap-10pxr">
      <h3 className="text-sub-em">{titleText}<span className="text-sub">{'(필수)'}</span></h3>
      <div className="flex items-center justify-center gap-6pxr">
        <label htmlFor="ingredient-name" className="sr-only">재료명</label>
        <input 
          id="ingredient-name" 
          type="text" 
          className="w-3/6 h-48pxr py-0 px-10pxr bg-gray_150 rounded-md" 
          placeholder="감자" 
          onChange={(e) => {
            e.preventDefault();
            if(e.target.value === "") return;
            setIngredName(e.target.value);
          }}/>
        <label htmlFor="ingredient-amount" className="sr-only">재료량</label>
        <input 
          id="ingredient-amount" 
          type="text" 
          className="w-2/6 h-48pxr py-0 px-10pxr bg-gray_150 rounded-md" 
          placeholder="100g, 3개" 
          onChange={(e) => {
            e.preventDefault();
            if(e.target.value === "") return;
            setIngredAmount(e.target.value);
          }}/>
        <button 
          className="w-1/6 bg-gray_150 h-48pxr rounded-md"
          onClick={(e) => {
            e.preventDefault();
            if (ingredName === "" || ingredAmount === "") return;
            const ingred = {
              name : ingredName,
              amount : ingredAmount
            }
            const updateIngreds = [...JSON.parse(ingredientData), ingred]
            setIngredientData(JSON.stringify(updateIngreds));
          }}>추가</button>
      </div>
      <div className="border-t-2 border-b-2 h-150pxr overflow-y-scroll no-scrollbar">
        {
          JSON.parse(ingredientData).map((item, index) => {
            return (
              <div key={index} className="flex gap-6pxr py-8pxr pl-10pxr border-b-2">
                <div className="w-5/6 flex justify-between pr-10pxr">
                  <div>{item.name}</div>
                  <div>{item.amount}</div>
                </div>
                <div className="h-29pxr w-1pxr bg-gray-300"></div>
                <button className="w-1/6" onClick={(e) => {
                  e.preventDefault();
                  const updateIngreds = JSON.parse(ingredientData).filter(i => i.name !== item.name);
                  setIngredientData(JSON.stringify(updateIngreds));
                  // update ingreds within the database
                }}>삭제</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}


interface TitleComponent {
  inputTitle: string;
  placeholder: string;
}

function TitleComponent({inputTitle, placeholder} : TitleComponent) {

  const [, setTitleField] = useAtom(title);

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
          className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md"
          placeholder={placeholder}
          onChange={titleInputHandler}
        />
      </label>
    </>
  )
}

interface FileInputComponentProps {
  inputTitle: string;
}

function FileInputComponent({inputTitle} : FileInputComponentProps) {
  const [, setImageFile] = useAtom(image);
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
      setImageFile(selectedFile);
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



import icon from "@/assets/icons/add.svg"


export function CreateOne() {




  return (
    <>
      <Header option="titleWithClose" title="레시피 등록하기" />
      <Form action='two' className='px-20pxr py-20pxr flex flex-col gap-42pxr pb-120pxr'>
        <FileInputComponent inputTitle={"레시피 이미지"}/>
        <TitleComponent inputTitle="레시피 제목" placeholder="레시피 제목" />
        <Ingredients titleText="재료" />
        <Ingredients titleText="양념" />
        <footer className="fixed bottom-0 left-0 w-full px-18pxr py-30pxr bg-white">
          <Button
            buttonCase="large"
            text={['다음']}
            route={[() => 'two']} />
        </footer>
      </Form>
      
    </>
  )
}