import { RecordModel } from "pocketbase";

interface DataInterface {
  name: string;
  amount: string;
}

interface DetailComponentInterface { 
  data: RecordModel;
}

export function Ingredients({data} : DetailComponentInterface) {
  return (
    <details className="w-full border-2">
      <summary className="text-body px-14pxr py-12pxr">재료</summary>
      <ul className="py-12pxr px-14pxr bg-gray-100">
        {JSON.parse(data?.ingredients).map((item:DataInterface, index:number) => {
          return (
            <li key={index} className="flex justify-between w-full py-11pxr text-sub border-b-2">
              <p>{item.name}</p>
              <p>{item.amount}</p>
            </li>
          )
        })}
      </ul>
    </details>
  )
}

export function Seasoning({data} : DetailComponentInterface) {
  return (
    <details className="w-full border-2">
      <summary className="text-body px-14pxr py-12pxr">양념</summary>
      <ul className="py-12pxr px-14pxr bg-gray-100">
        {JSON.parse(data?.seasoning).map((item:DataInterface, index:number) => {
          return (
            <li key={index} className="flex justify-between w-full py-11pxr text-sub border-b-2">
              <p>{item.name}</p>
              <p>{item.amount}</p>
            </li>
          )
        })}
      </ul>
    </details>
  )
}

export function Nutrition({data} : DetailComponentInterface) {
  return (
    <details className="w-full border-2">
      <summary className="text-body px-14pxr py-12pxr">양념</summary>
      <ul className="py-12pxr px-14pxr bg-gray-100">
        {JSON.parse(data?.seasoning).map((item:DataInterface, index:number) => {
          return (
            <li key={index} className="flex justify-between w-full py-11pxr text-sub border-b-2">
              <p>{item.name}</p>
              <p>{item.amount}</p>
            </li>
          )
        })}
      </ul>
    </details>
  )
}
