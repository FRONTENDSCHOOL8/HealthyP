import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type FullPageInfoProps = {
  icons: string[];
  text: string[];
  route: () => string;
  hasDetailedDescription: boolean;
  description?: string[];
};

const FullPageInfo = ({
  route,
  icons,
  text,
  hasDetailedDescription,
  description,
}: FullPageInfoProps) => {
  const navigate = useNavigate();
  const path = route();

  // 일정 시간 경과 후 route 경로로 페이지 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(path);
    }, 2000);

    return () => clearTimeout(timer);
  }, [path, navigate]);

  // isExistDescription 존재 여부에 따라 컨텐츠를 렌더링
  const renderContent = () => {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img src={icons[0]} alt={icons[1]} />
        <p className="text-title-2-em text-primary pt-32pxr">{text[0]}</p>
        <span className="text-title-1-em">{text[1]}</span>
        {hasDetailedDescription && description && (
          <div className="pt-[62px] flex flex-col justify-center items-center text-gray_700">
            {description.map((desc, index) => (
              <span key={index} className="text-sub">
                {desc}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return renderContent();
};

export default FullPageInfo;
