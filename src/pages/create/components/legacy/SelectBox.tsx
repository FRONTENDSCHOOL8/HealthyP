import { Required } from '@/components';
import { HTMLAttributes } from 'react';

interface SelectBoxProps extends HTMLAttributes<HTMLSelectElement> {
  id: string;
  dataArr: string[];
  label: string;
  required?: boolean;
  data: string;
}

export default function SelectBox({ id, dataArr, data, label, required = false, ...props }: SelectBoxProps) {
  return (
    <label className="text-sub-em">
      {label}
      {required && <Required />}
      <select
        value={data}
        {...props}
        required={required}
        id={id}
        className="w-full h-48pxr py-0 mt-10pxr px-6pxr text-start text-sub hover:bg-primary hover:text-white bg-gray_150 rounded-md"
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
