
import { Outlet } from 'react-router-dom';
export { CreateOne } from './CreateOne';
export { CreateTwo } from './CreateTwo';
export { CreateThree } from './CreateThree';
export { CreateComplete } from './CreateComplete';

import { atom, Provider, useAtom } from 'jotai';


const temp_data = [
  {
    name : "감자",
    amount : "100g, 3개"
  },
  {
    name : "고구마",
    amount : "10g, 3개"
  },
  {
    name : "가지",
    amount : "100g, 3개"
  },
  {
    name : "양파",
    amount : "100g, 3개"
  },
]

const temp_data_two = [
  {
    name : "고추장",
    amount : "100g, 3개"
  },
  {
    name : "된장",
    amount : "10g, 3개"
  },
  {
    name : "간장",
    amount : "100g, 3개"
  },
  {
    name : "양파",
    amount : "100g, 3개"
  },
]

const temp_data_three = [
  {
    image : "https://post-phinf.pstatic.net/MjAyMzExMjhfMTcz/MDAxNzAxMTU3NDc4NjE1.svjnly7XCe54EU15QaDR3rz-dBqd_n9ZZeqeGx_F3gsg.n3U3UZqfXr77v9ethu0bUwFEOJ1mHTiT_2YBM77Utpwg.JPEG/%EC%99%84%EC%84%B11.jpg?type=w1200",
    description : " 블렌더에 스타 아니스, 계피 스틱, 온 소고기 후추, 온 클로브를 넣고 약 30초 동안 향이 나도록 섞습니다.",
    tips : "heloo"
  },
  {
    image : "https://post-phinf.pstatic.net/MjAyMzExMjhfMTcz/MDAxNzAxMTU3NDc4NjE1.svjnly7XCe54EU15QaDR3rz-dBqd_n9ZZeqeGx_F3gsg.n3U3UZqfXr77v9ethu0bUwFEOJ1mHTiT_2YBM77Utpwg.JPEG/%EC%99%84%EC%84%B11.jpg?type=w1200",
    description : "물, 양파, 마늘, 생강, 그리고 표고버섯 줄기를 넣어 20분간 끓입니다. 그런 후에 국물을 걸러내고 냄비에 다시 담습니다.",
    tips : "heloo"
  },
  {
    image : "https://post-phinf.pstatic.net/MjAyMzExMjhfMTcz/MDAxNzAxMTU3NDc4NjE1.svjnly7XCe54EU15QaDR3rz-dBqd_n9ZZeqeGx_F3gsg.n3U3UZqfXr77v9ethu0bUwFEOJ1mHTiT_2YBM77Utpwg.JPEG/%EC%99%84%EC%84%B11.jpg?type=w1200",
    description : "냄비에 올리브유 1작은술 넣고, 잘게 썬 양파를 옅은 갈색이 되도록 3분동안 볶아줍니다",
    tips : ""
  },
]



export const ingredients = atom(temp_data);
export const seasoning = atom(temp_data_two);
export const recipeSteps = atom(temp_data_three);
export const title = atom('');
export const image = atom('');

export function CreateLayout() {
  const [titleField, setTitleField] = useAtom(title);
  const [ingredientData, setIngredientData] = useAtom(ingredients);
  const [seasoningData, setSeasoningData] = useAtom(seasoning);
  const [steps, setSteps] = useAtom(recipeSteps);
  const [imageUrl, setImageUrl] = useAtom(image);

  return (
    <div className="w-full h-full relative bg-white">
      <Provider>
        <Outlet />
      </Provider>
    </div>
  );
}
