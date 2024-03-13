import { SelectorProps } from './create';
import { Required } from '@/components';

const inputStyle = 'bg-gray_150 rounded-[7px] px-10pxr py-8pxr placeholder:text-500';

export default function Seletor({ title, id, optionList, register }: SelectorProps) {
  return (
    <div>
      <label htmlFor={id} className="text-body-em">
        {title}
        <Required />
      </label>
      <select id={id} {...register(id)} className={inputStyle}>
        {optionList.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
