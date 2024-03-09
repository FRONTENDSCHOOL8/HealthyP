import separateComma from '@/util/separateComma';
import { useRef, useState, useEffect, Key } from 'react';

export function OverflowCheckComponent({ items }: { items: string | undefined }) {
  const containerRef: React.MutableRefObject<HTMLUListElement | null> = useRef(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      if (container) {
        // 컨테이너의 실제 높이와 스크롤 가능한 높이를 비교
        const isOverflowing = container.scrollWidth > container.clientWidth;
        setIsOverflowed(isOverflowing);
      }
    };

    checkOverflow();
    // 창 크기가 변경될 때마다 오버플로우 체크
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [items]); // items 의존성이 변경될 때마다 오버플로우 체크

  if (!items) return;
  const itemsArray = separateComma(items);

  return (
    <ul className="gap-1 w-full flex mt-16pxr" ref={containerRef}>
      {itemsArray.map((item, index) => (
        <li key={index} className="shrink-0 bg-tag_color rounded-[7px] px-6pxr py-4pxr text-foot">
          {item}
        </li>
      ))}
      {isOverflowed && <div>+ more...</div>}
    </ul>
  );
}

export default function Keyword({ items }: { items: string | undefined }) {
  if (!items) return;
  const itemsArray = separateComma(items);
  const sliceItemsArray = itemsArray.slice(0, 5);

  return (
    <ul className="gap-1 flex items-start self-stretch flex-wrap list-none">
      {sliceItemsArray.map((item, index: Key) => (
        <li key={index} className="shrink-0 bg-tag_color rounded-[7px] px-6pxr py-4pxr text-foot">
          {item}
        </li>
      ))}
    </ul>
  );
}
