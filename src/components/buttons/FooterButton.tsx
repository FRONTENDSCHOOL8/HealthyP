import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

type ButtonProps = {
  buttonCase: 'large' | 'medium' | 'small';
  text: string[];
  route: (() => string)[];
  isActive?: boolean;
  onClickOne?: (idx: number | React.FormEvent<HTMLFormElement>) => void;
  onClickTwo?: (idx: number | React.FormEvent<HTMLFormElement>) => void;
};

const buttonVariant = {
  active: {
    scale: 1,
    background: '#91BD14',
    color: '#ffffff',
    transition: { duration: 0.5 },
  },
  inactive: {
    scale: 1,
    background: '#D9D9DA',
    color: '#3C3C43',
    transition: { duration: 0.5 },
  },
};

const getClassName = (buttonCase: string, index: number) => {
  let className =
    'flex flex-row justify-center items-center flex-nowrap w-full py-12pxr text-body-em';
  switch (buttonCase) {
    case 'large':
      className += '';
      break;
    case 'medium':
      className +=
        index === 0
          ? ' bg-gray_150 text-gray-700 basis-1/3 rounded-[7px]'
          : ' bg-primary text-white basis-2/3 rounded-[7px]';
      break;
    case 'small':
      className +=
        index === 0
          ? ' bg-gray_150 text-gray-700 basis-1/2 rounded-[7px]'
          : ' bg-primary text-white basis-1/2 rounded-[7px]';
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
  isActive = true,
  onClickOne,
  onClickTwo,
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
  const handleOnClick = async (idx: number): Promise<void> => {
    if (idx === 0 && onClickOne) {
      // 첫 번째 버튼 클릭 시 onClickOne 핸들러 실행
      await onClickOne(idx);
    } else if (idx === 1 && onClickTwo) {
      // 두 번째 버튼 클릭 시 onClickTwo 핸들러 실행
      await onClickTwo(idx);
    } else {
      // 아무 onClick 핸들러도 제공되지 않았다면 기존 로직(경로 이동) 수행
      const path = route[idx]();
      navigate(path);
    }
  };

  const getDynamicClassName = (buttonCase: string, index: number) => {
    const className = getClassName(buttonCase, index);

    return className;
  };

  // buttonCase에 따라 버튼 마크업 생성
  let buttonMarkup: JSX.Element;
  switch (buttonCase) {
    case 'large':
      buttonMarkup = (
        <AnimatePresence>
          <motion.div
            className="rounded-[7px]"
            animate={isActive ? 'active' : 'inactive'}
            variants={buttonVariant}
          >
            <button
              disabled={!isActive}
              onClick={() => handleOnClick(0)}
              className={getDynamicClassName(buttonCase, 0)}
            >
              {text[0]}
            </button>
          </motion.div>
        </AnimatePresence>
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
