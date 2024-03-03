import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type FullPageInfoProps = {
  pageCase: 'addRoute' | 'addSubText';
  route: () => string;
  icons: string[];
  text: string[];
  subText?: string[];
};

const useMapping = ({
  pageCase,
  icons,
  text,
  subText,
}: FullPageInfoProps): JSX.Element => {
  const infoMappings = {
    addRoute: (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img src={icons[0]} alt={icons[1]} className="w-[138px] h-[138px]" />
        <p className="text-title-2-em text-primary">{text[0]}</p>
        <span className="text-title-1-em">{text[1]}</span>
      </div>
    ),
    addSubText: (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img src={icons[0]} alt={icons[1]} className="w-[138px] h-[138px]" />
        <p className="text-title-2-em text-primary">{text[0]}</p>
        <span className="text-title-1-em">{text[1]}</span>
        {subText && (
          <div className="pt-[62px] flex flex-col justify-center items-center">
            <span className="text-sub">{subText[0]}</span>
            <span className="text-sub">{subText[1]}</span>
            <span className="text-sub">{subText[2]}</span>
          </div>
        )}
      </div>
    ),
  };

  return infoMappings[pageCase];
};

const FullPageInfo = ({
  pageCase,
  route,
  icons,
  text,
  subText,
}: FullPageInfoProps) => {
  const navigate = useNavigate();
  const path = route(); // 해당 인덱스의 콜백 함수를 호출하여 경로 추출

  useEffect(() => {
    // pageCase에 따라 navigate 호출
    if (pageCase === 'addRoute') {
      const timer = setTimeout(() => {
        navigate(path);
      }, 2000);

      // 컴포넌트가 언마운트되거나 pageCase가 변경되면 타이머 삭제
      return () => clearTimeout(timer);
    }
  }, [pageCase, path, navigate]); // pageCase와 navigate를 의존성 배열에 추가

  const fullPageInfoComponent = useMapping({
    pageCase,
    route,
    icons,
    text,
    subText,
  });
  return fullPageInfoComponent;
};
