// packages
import { Header, OneButtonModal, TwoButtonModal } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categories, difficult, schema } from './schema';
import { FormValues } from './components/create';
import { FieldsetInput, TextInput, Selector } from './components';

export function CreateOne() {
  const navigate = useNavigate();
  // state 상태관리
  const [sizeAlert, setSizeAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // form 제어
  const { register, getValues, control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  // form 에러
  const { errors } = formState;

  // 이벤트 헨들러
  const handleHeaderClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleConfirm = () => {
    navigate('/');
  };
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>HealthyP | 레시피 생성</title>
      </Helmet>
      <Header option="titlewithCloseAndFn" title="레시피 등록하기" handleClick={handleHeaderClick} />
      <form onSubmit={handleSubmit(onSubmit)} className="px-14pxr flex flex-col gap-20pxr">
        {/* <FileInput id="recipe-main-img" register={register} /> */}
        <TextInput
          as="input"
          title="레시피 제목"
          placeholder="맛좋은 홍감자 조림"
          id="recipe-title"
          maxLength={30}
          error={errors.recipeTitle}
          registerName="recipeTitle"
          register={register}
        />
        <TextInput
          as="textarea"
          title="레시피 설명"
          placeholder="sdasdsd"
          id="recipe-desc"
          maxLength={500}
          error={errors.recipeDesc}
          registerName="recipeDesc"
          register={register}
        />
        <Selector title="카테고리" id="category" optionList={categories} register={register} />
        <Selector title="난이도" id="difficult" optionList={difficult} register={register} />
        <FieldsetInput
          title="재료"
          id="ingredients"
          control={control}
          getValues={getValues}
          register={register}
          required
        />
        <FieldsetInput title="양념" id="seasoning" control={control} getValues={getValues} register={register} />
        <button type="submit" className="bg-primary text-white">
          다음
        </button>
      </form>
      {/* 이미지 파일 초과 에러 */}
      <OneButtonModal
        isOpen={sizeAlert}
        confirmModal={() => {
          setSizeAlert(false);
        }}
        titleText="파일 크기 초과!"
        firstLineText="5MB 이하 파일을 선택해주세요"
      />
      <TwoButtonModal
        isOpen={isOpen}
        headline="정말 나가시겠습니까?"
        closeModal={handleClose}
        confirmModal={handleConfirm}
        isAnimated={false}
      />
    </>
  );
}
