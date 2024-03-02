import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

type ButtonProps = {
  buttonCase: 'large' | 'medium' | 'small';
  text: string[];
  route: (() => string)[];
  isActive?: boolean;
};

const getClassName = (buttonCase: string, index: number) => {
  let className =
    'flex flex-row justify-center items-center flex-nowrap w-full rounded-[7px] py-12pxr text-body-em';
  switch (buttonCase) {
    case 'large':
      className += '';
      break;
    case 'medium':
      className +=
        index === 0
          ? ' bg-gray_150 text-gray-700 basis-1/3'
          : ' bg-primary text-white basis-2/3';
      break;
    case 'small':
      className +=
        index === 0
          ? ' bg-gray_150 text-gray-700 basis-1/2'
          : ' bg-primary text-white basis-1/2';
      break;
  }
  return className;
};

function ErrorFallback({ message }: { message: string }): JSX.Element {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{message}</pre>
    </div>
  );
}

const ButtonContent = ({
  buttonCase = 'large',
  text,
  route,
  isActive = false,
}: ButtonProps): JSX.Element => {
  const navigate = useNavigate();

  if (
    (buttonCase === 'medium' || buttonCase === 'small') &&
    (text.length !== 2 || route.length !== 2)
  ) {
    throw new Error(
      `${buttonCase} 케이스일 때 text와 route 배열의 길이가 정확히 2여야 합니다.`
    );
  }

  if (buttonCase === 'large' && (text.length !== 1 || route.length !== 1)) {
    throw new Error(
      `${buttonCase} 케이스일 때 text와 route 배열의 길이가 정확히 1이어야 합니다.`
    );
  }

  // 콜백 함수로 들어온 경로로 이동하는 핸들러
  const handleOnClick = (idx: number): void => {
    const path = route[idx](); // 해당 인덱스의 콜백 함수를 호출하여 경로 추출
    navigate(path); // 추출된 경로로 이동
  };

  const getDynamicClassName = (
    buttonCase: string,
    index: number,
    isActive: boolean
  ) => {
    let className = getClassName(buttonCase, index);

    if (buttonCase === 'large') {
      className += isActive
        ? ' bg-primary text-white'
        : ' bg-gray-200 text-gray-400 ';
    }

    return className;
  };

  // buttonCase에 따라 버튼 마크업 생성
  let buttonMarkup: JSX.Element;
  switch (buttonCase) {
    case 'large':
      buttonMarkup = (
        <div className="bg-white">
          <button
            onClick={() => handleOnClick(0)}
            className={getDynamicClassName(buttonCase, 0, isActive)}
          >
            {text[0]}
          </button>
        </div>
      );
      break;
    case 'medium':
    case 'small':
      {
        const buttons = text.map((buttonText, idx) => (
          <button
            key={idx}
            onClick={() => handleOnClick(idx)}
            className={getClassName(buttonCase, idx)}
          >
            {buttonText}
          </button>
        ));
        buttonMarkup = (
          <div className={`flex flex-row bg-white gap-8pxr`}>{buttons}</div>
        );
      }
      break;
    default:
      buttonMarkup = <div className="bg-white">{text[0]}</div>;
  }

  return buttonMarkup;
};

const Button = (props: ButtonProps) => {
  const [errorKey, setErrorKey] = useState('');

  const handleError = (error: Error) => {
    const errorMessage = error.message.split(' ')[0];
    setErrorKey(errorMessage);
  };

  return (
    <ErrorBoundary
      fallbackRender={() => (
        // 에러가 발생했을 때 랜더링 될 컴포넌트(ErrorFallback) 정의
        <ErrorFallback
          message={`${errorKey} 버튼은 text와 route 배열에 정확히 ${errorKey === 'large' ? '1개' : '2개'}의 항목이 필요합니다.`}
        />
      )}
      onError={handleError}
    >
      <ButtonContent {...props} />
    </ErrorBoundary>
  );
};

export default Button;
