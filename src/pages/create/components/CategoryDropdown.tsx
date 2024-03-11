import { category } from '@/stores/stores';
import { useAtom } from 'jotai';
import { MutableRefObject, useRef } from 'react';

const categories = ['건강식', '다이어트', '벌크업', '비건'];

export function CategoryDropdown() {
  const categorySelectModal: MutableRefObject<HTMLDialogElement | null> = useRef(null);
  const [categoryData, setCategoryData] = useAtom(category);

  return (
    <div className="flex flex-col gap-10pxr">
      <p className="text-sub-em">
        카테고리<span className="text-sub">{' (필수)'}</span>
      </p>
      <button
        type="button"
        onClick={() => categorySelectModal.current?.showModal()}
        className="w-full h-48pxr py-0 px-10pxr text-start focus:bg-primary focus:text-white bg-gray_150 rounded-[7px]"
      >
        {categoryData}
      </button>
      <dialog ref={categorySelectModal} className="w-full rounded-[7px]">
        <div className="flex items-center justify-between pl-8pxr py-8pxr">
          <h3 className="text-body-em">키워드를 선택해주세요.</h3>
          <button
            className="bg-close-icon size-36pxr bg-no-repeat bg-center"
            onClick={(e) => {
              e.preventDefault();
              categorySelectModal.current?.close();
            }}
          ></button>
        </div>
        <ul className={`w-full h-240pxr overflow-auto`}>
          {categories.map((item, idx) => {
            return (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => {
                    setCategoryData(item);
                    categorySelectModal.current?.close();
                  }}
                  className="w-full h-48pxr py-0 px-10pxr text-start hover:bg-primary hover:text-white bg-white border-t "
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </dialog>
    </div>
  );
}
