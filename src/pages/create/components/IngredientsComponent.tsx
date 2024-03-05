import { useState } from "react";
import { useAtom, PrimitiveAtom } from "jotai";


interface IngredientsProps {
  titleText: string;
  atom : PrimitiveAtom<string>;
}

export function IngredientsComponent({titleText, atom} : IngredientsProps) {
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