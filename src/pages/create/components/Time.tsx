import { useAtom } from 'jotai';
import { Required } from '@/components';
import { time } from '@/stores/stores';

export default function Time() {
  const [inputTime, setInputTime] = useAtom(time);
  return (
    <>
      <div className="flex flex-col gap-10pxr">
        <p className="text-sub-em">
          조리 시간
          <Required />
        </p>
        <label htmlFor="time" className="sr-only">
          조리 시간
        </label>
        <input
          type="number"
          className="w-full h-48pxr py-0 px-10pxr bg-gray_150 rounded-md"
          placeholder="분"
          value={inputTime}
          id="time"
          onChange={(e) => {
            e.preventDefault();
            setInputTime(parseInt(e.target.value));
          }}
        />
      </div>
    </>
  );
}
