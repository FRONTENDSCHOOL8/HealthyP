import { useNavigate } from 'react-router-dom';

/* buttonCase가 medium과 small일 떄는 text와 route의 배열의 길이가 2여야 함 */
type ButtonProps = {
  buttonCase: 'large' | 'medium' | 'small';
  text: string[];
  route: (() => string)[];
};

const getClassName = (buttonCase: string, index: number) => {
  let className =
    'flex flex-row justify-center items-center flex-nowrap w-full rounded-[7px] py-12pxr text-body-em';
  switch (buttonCase) {
    case 'large':
      className += ' bg-primary text-white';
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

export function ErrorFallback(): JSX.Element {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>
        Medium 버튼과 Small 버튼은 text와 route 배열에 정확히 2개의 항목이
        필요합니다.
      </pre>
      <button>Try again</button>
    </div>
  );
}

const Button = ({
  buttonCase = 'large',
  text,
  route,
}: ButtonProps): JSX.Element => {
  const navigate = useNavigate();

  // 콜백 함수로 들어온 경로로 이동하는 핸들러
  const handleOnClick = (idx: number): void => {
    const path = route[idx](); // 해당 인덱스의 콜백 함수를 호출하여 경로 추출
    navigate(path); // 추출된 경로로 이동
  };

  // buttonCase에 따라 버튼 마크업 생성
  let buttonMarkup: JSX.Element;
  switch (buttonCase) {
    case 'large':
      buttonMarkup = (
        <div className="bg-white">
          <button
            onClick={() => handleOnClick(0)}
            className={getClassName(buttonCase, 0)}
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

export default Button;
