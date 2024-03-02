import { Header, InputComponent } from "@/components"
import { useState } from "react"
import { Form } from "react-router-dom"

const temp_data = [
  {
    id : "1",
    ingredient_name : "감자",
    ingredient_amount : "100g, 3개"
  },
  {
    id : "2",
    ingredient_name : "고구마",
    ingredient_amount : "10g, 3개"
  },
  {
    id : "3",
    ingredient_name : "가지",
    ingredient_amount : "100g, 3개"
  },
  {
    id : "4",
    ingredient_name : "양파",
    ingredient_amount : "100g, 3개"
  },
]


function Ingredients() {
  const [ingredName, setIngredName] = useState('');
  const [ingredAmount, setIngredAmount] = useState('');
  const [ingredients, setIngredients] = useState([]);



  return (
    <div className="flex flex-col gap-10pxr">
      <h3 className="text-sub-em">재료 <span className="text-sub">{'(필수)'}</span></h3>
      <div className="flex items-center justify-center gap-6pxr">
        <label htmlFor="ingredient-name" className="sr-only">재료명</label>
        <input id="ingredient-name" type="text" className="w-3/6 h-48pxr py-0 px-10pxr bg-gray_150 rounded-md" placeholder="감자" />
        <label htmlFor="ingredient-amount" className="sr-only">재료량
        </label>
        <input id="ingredient-amount" type="text" className="w-2/6 h-48pxr py-0 px-10pxr bg-gray_150 rounded-md" placeholder="100g, 3개" />
        <button className="w-1/6 bg-gray_150 h-48pxr rounded-md">추가</button>
      </div>
      <div className="border-t-2 border-b-2 h-150pxr overflow-y-scroll no-scrollbar">
        {
          temp_data.map(item => {
            return (
              <div key={item.id} className="flex gap-6pxr py-8pxr pl-10pxr border-b-2">
                <div className="w-5/6 flex justify-between pr-10pxr">
                  <div>{item.ingredient_name}</div>
                  <div>{item.ingredient_amount}</div>
                </div>
                <div className="h-29pxr w-1pxr bg-gray-300"></div>
                <button className="w-1/6">삭제</button>
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
      <Header option="onlyArrow" />
      <Form action='two' className='px-20pxr py-20pxr flex flex-col gap-42pxr'>
        <InputComponent option="fileInput" inputTitle="메인 이미지 사진" />
        <InputComponent option="nickname" />
        <Ingredients></Ingredients>
      </Form>
    </>
  )
}