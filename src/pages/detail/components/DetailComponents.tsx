import { RecordModel } from 'pocketbase';

interface DataInterface {
  name: string;
  amount: string;
}

interface DetailComponentInterface {
  data: RecordModel;
  title?: string;
}

const summaryStyle =
  'text-body px-14pxr py-12pxr list-none flex justify-between';
const arrowIconStyle = 'bg-arrow-small-icon flex size-6 bg-contain';

export function ArcodianCompo({ data, title }: DetailComponentInterface) {
  return (
    <details className="w-full border-b border-t appearance-none">
      <summary className={summaryStyle}>
        {title}
        <span className={arrowIconStyle}></span>
      </summary>

      <ul className="pt-12pxr pb-48pxr px-14pxr bg-gray_100 border-t">
        {JSON.parse(data?.ingredients).map(
          (item: DataInterface, index: number) => {
            return (
              <li
                key={index}
                className="flex justify-between w-full py-11pxr text-sub border-b px-4pxr"
              >
                <p>{item.name}</p>
                <p>{item.amount}</p>
              </li>
            );
          }
        )}
      </ul>
    </details>
  );
}

export function Ingredients({ data }: DetailComponentInterface) {
  return (
    <details className="w-full border-b border-t appearance-none">
      <summary className={summaryStyle}>
        재료{' '}
        <span className="bg-arrow-small-icon flex size-6 bg-contain"></span>
      </summary>

      <ul className="pt-12pxr pb-48pxr px-14pxr bg-gray_100 border-t">
        {JSON.parse(data?.ingredients).map(
          (item: DataInterface, index: number) => {
            return (
              <li
                key={index}
                className="flex justify-between w-full py-11pxr text-sub border-b px-4pxr"
              >
                <p>{item.name}</p>
                <p>{item.amount}</p>
              </li>
            );
          }
        )}
      </ul>
    </details>
  );
}

export function Seasoning({ data }: DetailComponentInterface) {
  return (
    <details className="w-full border-b ">
      <summary className={summaryStyle}>양념</summary>
      <ul className="py-12pxr px-14pxr bg-gray-100 ">
        {JSON.parse(data?.seasoning).map(
          (item: DataInterface, index: number) => {
            return (
              <li
                key={index}
                className="flex justify-between w-full py-11pxr text-sub border-b"
              >
                <p>{item.name}</p>
                <p>{item.amount}</p>
              </li>
            );
          }
        )}
      </ul>
    </details>
  );
}

export function Nutrition({ data }: DetailComponentInterface) {
  return (
    <details className="w-full border-b">
      <summary className={summaryStyle}>양념</summary>
      <ul className="py-12pxr px-14pxr bg-gray-100">
        {JSON.parse(data?.seasoning).map(
          (item: DataInterface, index: number) => {
            return (
              <li
                key={index}
                className="flex justify-between w-full py-11pxr text-sub border-b-2"
              >
                <p>{item.name}</p>
                <p>{item.amount}</p>
              </li>
            );
          }
        )}
      </ul>
    </details>
  );
}
