import { FieldsetInputProps } from './create';
import { useFieldArray } from 'react-hook-form';
import { ErrorMessage } from '.';
import { Required } from '@/components';
import { useRef } from 'react';

const inputStyle = 'bg-gray_150 rounded-[7px] px-10pxr py-8pxr placeholder:text-500';

export default function FieldsetInput({
  title,
  id,
  required = false,
  control,
  register,
  getValues,
}: FieldsetInputProps) {
  const { append, remove, fields } = useFieldArray({
    name: id,
    control,
  });
  const inputRefA: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const inputRefB: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  return (
    <>
      <fieldset className="relative flex gap-8pxr">
        <legend className="text-body-em mb-4pxr">
          {title}
          {required && <Required />}
        </legend>
        <div className="">
          <label htmlFor={id + '-name'} className="sr-only">
            재료명
          </label>
          <input ref={inputRefA} id={id + '-name'} type="text" className={inputStyle} />
        </div>
        <div className="">
          <label htmlFor={id + '-amount'} className="sr-only">
            수량
          </label>
          <input ref={inputRefB} id={id + '-amount'} type="text" className={inputStyle} />
        </div>
        <button
          type="button"
          onClick={() => {
            inputRefA.current?.focus();
            // field에 값 추가
            if (!inputRefA.current?.value || !inputRefB.current?.value) return;
            append({ name: inputRefA.current.value, amount: inputRefB.current.value });
            // 인풋 초기화
            // trigger("ingredient");
            inputRefA.current.value = '';
            inputRefB.current.value = '';
          }}
        >
          추가
        </button>
      </fieldset>
      <div className="relative">
        <ul {...register(id)}>
          {fields.map((field, index) => {
            const ingreName = getValues(`${id}.${index}.name`);
            const ingreAmount = getValues(`${id}.${index}.amount`);
            return (
              <li key={field.id}>
                <p {...register(`${id}.${index}.name`)}>{ingreName}</p>
                <p {...register(`${id}.${index}.amount`)}>{ingreAmount}</p>
                <button type="button" onClick={() => remove(index)}>
                  삭제
                </button>
              </li>
            );
          })}
        </ul>
        <ErrorMessage>{required && getValues(id)?.length < 1 && '하나이상 있어야한다'}</ErrorMessage>
      </div>
    </>
  );
}
