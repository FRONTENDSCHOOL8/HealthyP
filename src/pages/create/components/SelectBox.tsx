import { Required } from '@/components';
import { HTMLAttributes } from 'react';

interface SelectBoxProps extends HTMLAttributes<HTMLSelectElement> {
  id: string;
  dataArr: string[];
  label: string;
  isRequired?: boolean;
}

export default function SelectBox({ id, dataArr, label, isRequired = false, ...props }: SelectBoxProps) {
  return (
    <label className="text-sub-em">
      {label}
      {isRequired ? <Required /> : ''}
      <select
        {...props}
        required={isRequired}
        id={id}
        className="w-full h-48pxr py-0 px-10pxr text-start hover:bg-primary hover:text-white bg-gray_150 rounded-md"
      >
        {dataArr.map((option) => (
          <option key={option} className="bg-white text-black  hover:text-white selection:bg-primary" value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
