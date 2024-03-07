import separateComma from '@/util/separateComma';
import { Key } from 'react';

export default function Keyword({ items }: { items: string | undefined }) {
  if (!items) return;
  const itemsArray = separateComma(items);
  const sliceItemsArray = itemsArray.slice(0, 5);

  return (
    <ul className="gap-1 flex items-start self-stretch flex-wrap list-none">
      {sliceItemsArray.map((item, index: Key) => (
        <li
          key={index}
          className="shrink-0 bg-tag_color rounded-[7px] px-6pxr py-4pxr text-foot"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
