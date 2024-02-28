import separateComma from '@/util/separateComma';
import { Key } from 'react';

export default function Keyword({ items }: { items: string }) {
  const itemsString = items;
  const itemsArray = separateComma(itemsString);
  const sliceItemsArray = itemsArray.slice(0, 5);

  return (
    <div className="px-4 pt-4 gap-2 flex items-start self-stretch">
      {sliceItemsArray.map((item, index: Key) => (
        <div
          key={index}
          className="bg-tagColor rounded-[7px] flex px-1 py-6pxr justify-center items-center"
        >
          <p className="text-cap-1">{item}</p>
        </div>
      ))}
    </div>
  );
}
