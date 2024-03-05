import separateComma from '@/util/separateComma';
import { Key } from 'react';

export default function Keyword({ items }: { items: string }) {
  const itemsArray = separateComma(items);
  const sliceItemsArray = itemsArray.slice(0, 5);

  return (
    <ul className="gap-2 flex items-start self-stretch flex-wrap list-none">
      {sliceItemsArray.map((item, index: Key) => (
        <li
          key={index}
          className="shrink-0 bg-tag_color rounded-[7px] flex px-1 py-6pxr justify-center items-center text-cap-1"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
