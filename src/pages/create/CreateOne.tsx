import { Header, InputComponent, Button } from "@/components"
import { useAtom } from "jotai";
import { useState } from "react"
import { Form } from "react-router-dom"
import { ingredients, seasoning } from ".";

interface IngredientsProps {
  titleText: string;
  data: typeof ingredients;
}

function Ingredients({titleText, data} : IngredientsProps) {
  const [ingredName, setIngredName] = useState('');
  const [ingredAmount, setIngredAmount] = useState('');
  const [ingredientData, setIngredientData] = useAtom(data);

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
            setIngredAmount(e.target.value);
          }}/>
        <button 
          className="w-1/6 bg-gray_150 h-48pxr rounded-md"
          onClick={(e) => {
            e.preventDefault();
            const ingredIndex = ingredientData.length + 1; 
            const ingred = {
              id : ingredIndex.toString(),
              ingredient_name : ingredName,
              ingredient_amount : ingredAmount
            }
            const updateIngreds = [...ingredientData, ingred]
            setIngredientData(updateIngreds);
          }}>추가</button>
      </div>
      <div className="border-t-2 border-b-2 h-150pxr overflow-y-scroll no-scrollbar">
        {
          ingredientData.map(item => {
            return (
              <div key={item.id} className="flex gap-6pxr py-8pxr pl-10pxr border-b-2">
                <div className="w-5/6 flex justify-between pr-10pxr">
                  <div>{item.ingredient_name}</div>
                  <div>{item.ingredient_amount}</div>
                </div>
                <div className="h-29pxr w-1pxr bg-gray-300"></div>
                <button className="w-1/6" onClick={(e) => {
                  e.preventDefault();
                  const updateIngreds = ingredientData.filter(i => i.id !== item.id);
                  setIngredientData(updateIngreds);
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


export function CreateOne() {
  return (
    <>
      <Header option="titleWithClose" title="레시피 등록하기" />
      <Form action='two' className='px-20pxr py-20pxr flex flex-col gap-42pxr pb-120pxr'>
        <InputComponent option="fileInput" inputTitle="메인 이미지 사진" />
        <InputComponent option="defaultInput" inputTitle="레시피 제목" />
        <Ingredients titleText="재료" data={ingredients}/>
        <Ingredients titleText="양념" data={seasoning}/>
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