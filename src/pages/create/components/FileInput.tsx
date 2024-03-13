import { Required } from '@/components';
import { FileInputProps } from './create';

export function FileInput({ id, register }: FileInputProps) {
  return (
    <div className="focus-within:border-primary focus-within:border-2 h-180pxr relative rounded-[12px]">
      <img src="" alt="" className={`size-full opacity-0`} />
      <div className={`absolute left-0 top-0 size-full bg-gray_150 rounded-[12px]`}></div>
      <label htmlFor={id} className="sr-only">
        레시피 메인 이미지
        <Required />
      </label>
      <input type="file" id={id} className="size-full absolute top-0 left-0 opacity-0" {...register('recipeMainImg')} />
    </div>
  );
}
