import { Required } from '@/components';
import { time } from '@/stores/stores';
import { useAtom } from 'jotai';
// import { useState } from 'react';

export function Time() {
  const [, setInputTime] = useAtom(time);
  return (
    <>
      <div className="flex flex-col gap-10pxr">
        <p className="text-sub-em">
          조리 시간
          <Required />
        </p>
        <label htmlFor="time" className="sr-only">
          조리 시간
        </label>
        <input
          type="number"
          className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md"
          placeholder="분"
          id="time"
          onChange={(e) => {
            e.preventDefault();
            setInputTime(parseInt(e.target.value));
          }}
        />
      </div>
    </>
  );
}

// const difficult = ['쉬움', '보통', '어려움'];

// export function Difficulty() {
//   const [active, setActive] = useState(false);
//   const [categoryData, setCategoryData] = useAtom(difficulty);
//   return (
//     <>
//       <div className="flex flex-col gap-10pxr">
//         <p className="text-sub-em">
//           조리 난이도<span className="text-sub"> (필수)</span>
//         </p>
//         <button
//           type="button"
//           onClick={() => setActive(!active)}
//           className="w-full h-48pxr py-0 px-10pxr text-start hover:bg-primary hover:text-white bg-gray_150 rounded-md"
//         >
//           {categoryData}
//         </button>
//         <ul className={`${active ? 'block' : 'hidden'} bg-gray_150`}>
//           {difficult.map((item, idx) => {
//             return (
//               <li key={idx}>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setCategoryData(item);
//                     setActive(false);
//                   }}
//                   className="w-full h-48pxr py-0 px-10pxr text-start hover:bg-primary hover:text-white bg-gray_150 rounded-md"
//                 >
//                   {item}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </>
//   );
// }
