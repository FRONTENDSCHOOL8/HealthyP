
import { Outlet } from 'react-router-dom';
export { CreateOne } from './CreateOne';
export { CreateTwo } from './CreateTwo';
export { CreateThree } from './CreateThree';
export { CreateComplete } from './CreateComplete';

import { atom, useAtom } from 'jotai';


const temp_data_one = [
  {
    "name": "스타 아니스",
    "amount": "2개"
  },
  {
    "name": "계피 스틱",
    "amount": "1개"
  },
  {
    "name": "온 소고기 후추",
    "amount": "1큰술"
  },
  {
    "name": "온 클로브",
    "amount": "¼큰술"
  },
  {
    "name": "물",
    "amount": "5컵"
  },
  {
    "name": "작은 노란 양파(1인치 크기로 썬 것)",
    "amount": "½개"
  },
  {
    "name": "다진 마늘",
    "amount": "2개"
  },
  {
    "name": "신선한 생강(2인치, 반으로 썬 것)",
    "amount": "1조각"
  },
  {
    "name": "표고버섯(줄기는 제거하고 보관한 것)",
    "amount": "4온스"
  },
  {
    "name": "타마리 소스",
    "amount": "¼컵 (맛에 따라 더 추가)"
  },
  {
    "name": "현미 식초",
    "amount": "1큰술 (맛에 따라 더 추가)"
  },
  {
    "name": "다진 파",
    "amount": "2개"
  },
  {
    "name": "베이비 복초이",
    "amount": "2개 (길게 4등분)"
  },
  {
    "name": "얼려 꺼낸 에다마메",
    "amount": "½컵"
  },
  {
    "name": "삶은 쌀국수",
    "amount": "4온스"
  }
]

const temp_data_two = [
  {
    "name": "물",
    "amount": "5컵"
  },
  {
    "name": "신선한 생강(2인치, 반으로 썬 것)",
    "amount": "1조각"
  },
  {
    "name": "표고버섯(줄기는 제거하고 보관한 것)",
    "amount": "4온스"
  },
  {
    "name": "타마리 소스",
    "amount": "¼컵 (맛에 따라 더 추가)"
  },
  {
    "name": "현미 식초",
    "amount": "1큰술 (맛에 따라 더 추가)"
  },
  {
    "name": "다진 파",
    "amount": "2개"
  },
  {
    "name": "베이비 복초이",
    "amount": "2개 (길게 4등분)"
  },
  {
    "name": "얼려 꺼낸 에다마메",
    "amount": "½컵"
  },
  {
    "name": "삶은 쌀국수",
    "amount": "4온스"
  }
]


const temp_data_three = [
  {
    id: "aslkdjal",
    image : "https://post-phinf.pstatic.net/MjAyMzExMjhfMTcz/MDAxNzAxMTU3NDc4NjE1.svjnly7XCe54EU15QaDR3rz-dBqd_n9ZZeqeGx_F3gsg.n3U3UZqfXr77v9ethu0bUwFEOJ1mHTiT_2YBM77Utpwg.JPEG/%EC%99%84%EC%84%B11.jpg?type=w1200",
    description : " 블렌더에 스타 아니스, 계피 스틱, 온 소고기 후추, 온 클로브를 넣고 약 30초 동안 향이 나도록 섞습니다.",
    tips : "heloo"
  },
  {
    id: "aslkasssl",
    image : "https://post-phinf.pstatic.net/MjAyMzExMjhfMTcz/MDAxNzAxMTU3NDc4NjE1.svjnly7XCe54EU15QaDR3rz-dBqd_n9ZZeqeGx_F3gsg.n3U3UZqfXr77v9ethu0bUwFEOJ1mHTiT_2YBM77Utpwg.JPEG/%EC%99%84%EC%84%B11.jpg?type=w1200",
    description : "물, 양파, 마늘, 생강, 그리고 표고버섯 줄기를 넣어 20분간 끓입니다. 그런 후에 국물을 걸러내고 냄비에 다시 담습니다.",
    tips : "heloo"
  },
  {
    id: "bhjkjsdfs",
    image : "https://post-phinf.pstatic.net/MjAyMzExMjhfMTcz/MDAxNzAxMTU3NDc4NjE1.svjnly7XCe54EU15QaDR3rz-dBqd_n9ZZeqeGx_F3gsg.n3U3UZqfXr77v9ethu0bUwFEOJ1mHTiT_2YBM77Utpwg.JPEG/%EC%99%84%EC%84%B11.jpg?type=w1200",
    description : "냄비에 올리브유 1작은술 넣고, 잘게 썬 양파를 옅은 갈색이 되도록 3분동안 볶아줍니다",
    tips : ""
  },
]



export const ingredients = atom(JSON.stringify(temp_data_one));
export const seasoning = atom(JSON.stringify(temp_data_two));
export const recipeSteps = atom(JSON.stringify(temp_data_three));
export const title = atom('');
export const image = atom<File | null>(null);
export const description = atom('');

export function CreateLayout() {
  const [titleField, setTitleField] = useAtom(title);
  const [ingredientData, setIngredientData] = useAtom(ingredients);
  const [seasoningData, setSeasoningData] = useAtom(seasoning);
  const [steps, setSteps] = useAtom(recipeSteps);
  const [imageUrl, setImageUrl] = useAtom(image);
  const [descriptionText, setDescriptionText] = useAtom(description);

  return (
    <div className="w-full h-full relative bg-white">
      <Outlet />
    </div>
  );
}
