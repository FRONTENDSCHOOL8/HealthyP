import { SelectorProps } from '../create';
import { Required } from '@/components';

const inputStyle = 'bg-gray_150 rounded-[7px] px-10pxr py-8pxr placeholder:text-500 w-full';

export default function Seletor({ title, id, optionList, register }: SelectorProps) {
  return (
    <div className="group flex flex-col relative">
      <label htmlFor={id} className="text-body-em mb-10pxr">
        {title}
        <Required />
      </label>

      <select id={id} {...register(id)} className={inputStyle}>
        {optionList.map((value, index) => (
          <option className="w-svw" key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
      <span className="group-focus-within:rotate-180 bg-arrow-small-icon size-6 absolute pointer-events-none right-4pxr bottom-6pxr transition-transform"></span>
    </div>
  );
}
