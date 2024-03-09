// import { motion } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { RecordModel } from 'pocketbase';
import { useState } from 'react';

interface DataInterface {
  name: string;
  amount: string;
}

interface AccordionListProps {
  data: RecordModel;
  type: string;
  title?: string;
  first?: boolean;
}

interface AccordionItemsProps {
  data: RecordModel;
  type: string;
  isOpen: boolean;
}

function AccordionItems({ isOpen, data, type }: AccordionItemsProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0.3 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0.3 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden px-14pxr bg-gray_100 shadow-inner border-t border-gray_200"
        >
          {JSON.parse(data?.[type]).map((item: DataInterface, index: number) => {
            return (
              <li key={index} className={`flex justify-between w-full py-11pxr text-sub border-b px-3pxr `}>
                <p>{item.name}</p>
                <p>{item.amount}</p>
              </li>
            );
          })}
          <li className="h-48pxr"></li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

// 이게 원래 detail 태그로 구현한 거시기
export function AccordionListDetail({ data, type, title = '재료', first }: AccordionListProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      className={`w-full border-b appearance-none group ${first ? 'border-t' : ''}`}
      onToggle={() => setIsOpen(!isOpen)}
      open={isOpen}
    >
      <summary className="text-body pl-14pxr pr-10pxr py-12pxr list-none flex justify-between">
        {title}
        <span className="bg-arrow-small-icon flex size-6 bg-contain transition-all group-open:rotate-180"></span>
      </summary>
      <AccordionItems data={data} type={type} isOpen={isOpen} />
    </details>
  );
}

// 이건 애니메이션 안돼서 그냥 button으로 만들어버린거 -> 멋쟁이 은원이 해결!
export function AccordionList({ data, type, title = '재료', first = false }: AccordionListProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div role="listbox" className={`w-full border-gray_200 border-b appearance-none group ${first ? 'border-t' : ''}`}>
      <button
        className={`w-full text-body pl-14pxr pr-10pxr py-12pxr list-none flex justify-between`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`${title} 상세보기`}
      >
        {title}
        <span
          className={`bg-arrow-small-icon flex size-6 bg-contain ${isOpen ? 'rotate-180 transition-all' : 'transition-all'}`}
        ></span>
      </button>
      <AccordionItems data={data} type={type} isOpen={isOpen} />
    </div>
  );
}
