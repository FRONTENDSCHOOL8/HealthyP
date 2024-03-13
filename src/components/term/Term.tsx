import { useAtom } from 'jotai';
import { isCheckedOptionsAtom, isCheckedRequiredAtom } from './atomTerm';

const PRIMARY_COLOR = '#117146';
const DEFAULT_COLOR = '#B2B2B3';
const TEXT_BLACK = 'text-black';
const TEXT_DEFAULT = 'text-gray-500';

interface TermProps {
  name: string;
  required: boolean;
  mainContent: string;
  subContent: string;
}

export const Term = ({ name, required = false, mainContent, subContent }: TermProps) => {
  const [isChecked, setIsChecked] = useAtom(required ? isCheckedRequiredAtom : isCheckedOptionsAtom);

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="rounded-[7px] border border-gray-200">
      <div className="p-12pxr flex gap-2 items-center">
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={isChecked}
          onChange={handleChecked}
          className="hidden cursor-pointer"
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleChecked}
          className="cursor-pointer"
        >
          <path
            d="M9.57019 15.5356L18.1279 6.97793C18.2683 6.83755 18.4335 6.76575 18.6235 6.76255C18.8136 6.75934 18.982 6.83113 19.1288 6.97793C19.2724 7.12471 19.3442 7.29154 19.3442 7.47841C19.3442 7.66526 19.2724 7.83047 19.1288 7.97406L10.175 16.9279C9.99934 17.1035 9.79774 17.1914 9.57019 17.1914C9.34262 17.1914 9.14262 17.1035 8.97019 16.9279L4.87596 12.8337C4.73238 12.6933 4.66026 12.5289 4.65961 12.3404C4.65898 12.152 4.73205 11.9843 4.87884 11.8376C5.02564 11.6908 5.19246 11.6174 5.37931 11.6174C5.56616 11.6174 5.73299 11.6908 5.87979 11.8376L9.57019 15.5356Z"
            fill={isChecked ? PRIMARY_COLOR : DEFAULT_COLOR}
          />
        </svg>
        <label htmlFor={name} className={`text-foot cursor-pointer ${isChecked ? TEXT_BLACK : TEXT_DEFAULT}`}>
          {mainContent}
          <span className={`text-primary ${required ? 'inline' : 'hidden'}`}>(필수)</span>
        </label>
      </div>
      <hr />
      <pre className="text-gray-700 text-sub px-14pxr py-4pxr bg-[#F0F0F1] whitespace-pre-wrap overflow-y-auto max-h-164pxr no-scrollbar font-sans">
        {subContent}
      </pre>
    </div>
  );
};
