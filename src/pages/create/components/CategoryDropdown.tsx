import { category } from "@/stores/stores";
import { useAtom } from "jotai";
import { useState } from "react"

const categories = [
  '건강식',
  '다이어트',
  '벌크업',
  '비건'
]

export function CategoryDropdown() {
  const [active, setActive] = useState(false);
  const [categoryData, setCategoryData] = useAtom(category);

  return (
    <div className="flex flex-col gap-10pxr">
      <p className="text-sub-em">카테고리<span className="text-sub">{' (필수)'}</span></p>
      <button 
        type="button" 
        onClick={() => setActive(!active)}
        className="w-full h-48pxr py-0 px-10pxr text-start hover:bg-primary hover:text-white bg-gray_150 rounded-md"
        >{categoryData}
      </button>
      <ul className={`${active ? 'block' : 'hidden'} bg-gray_150`}>
        {
          categories.map((item, idx) => {
            return (
              <li key={idx}>
                <button 
                  type="button" 
                  onClick={() => {setCategoryData(item); setActive(false)}}
                  className="w-full h-48pxr py-0 px-10pxr text-start hover:bg-primary hover:text-white bg-gray_150 rounded-md"
                >{item}</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}