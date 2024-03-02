
import { Outlet } from 'react-router-dom';
export { CreateOne } from './CreateOne';
export { CreateTwo } from './CreateTwo';
export { CreateThree } from './CreateThree';
export { CreateComplete } from './CreateComplete';

import { atom, Provider, useAtom } from 'jotai';


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

const temp_data_two = [
  {
    id : "1",
    ingredient_name : "고추장",
    ingredient_amount : "100g, 3개"
  },
  {
    id : "2",
    ingredient_name : "된장",
    ingredient_amount : "10g, 3개"
  },
  {
    id : "3",
    ingredient_name : "간장",
    ingredient_amount : "100g, 3개"
  },
  {
    id : "4",
    ingredient_name : "양파",
    ingredient_amount : "100g, 3개"
  },
]

export const ingredients = atom(temp_data);
export const seasoning = atom(temp_data_two);

export function CreateLayout() {
  const [ingredientData, setIngredientData] = useAtom(ingredients);
  const [seasoningData, setSeasoningData] = useAtom(seasoning);

  return (
    <div className="w-full h-full relative bg-white">
      <Provider>
        <Outlet />
      </Provider>
    </div>
  );
}
