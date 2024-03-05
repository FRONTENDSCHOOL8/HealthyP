import { Header, Button, FileInputComponent, TextAreaComponent } from "@/components"
import { PrimitiveAtom, useAtom, useSetAtom } from "jotai";
import { useState } from "react"
import { Form } from "react-router-dom"
import { ingredients, image, title, seasoning, description } from ".";

interface IngredientsProps {
  titleText: string;
  atom : PrimitiveAtom<string>;
}

function IngredientsComponent({titleText, atom} : IngredientsProps) {
  const [ingredName, setIngredName] = useState('');
  const [ingredAmount, setIngredAmount] = useState('');
  const [ingredientData, setIngredientData] = useAtom(atom);

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
          className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md"
          placeholder={placeholder}
          onChange={titleInputHandler}
        />
      </label>
    </>
  )
}



export function CreateOne() {
  const setImageFile = useSetAtom(image);
  const setDescription = useSetAtom(description)


  return (
    <>
      <Header option="titleWithClose" title="레시피 등록하기" />
      <Form action='two' className='px-20pxr py-20pxr flex flex-col gap-42pxr pb-120pxr'>
        <FileInputComponent inputTitle={"레시피 이미지"} setFile={setImageFile}/>
        <TitleComponent inputTitle="레시피 제목" placeholder="레시피 제목" />
        <TextAreaComponent inputTitle="레시피 설명" maxCharCount={400} requiredText=" (필수)" setData={setDescription}/>
        <IngredientsComponent titleText="재료" atom={ingredients} />
        <IngredientsComponent titleText="양념" atom={seasoning} />
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