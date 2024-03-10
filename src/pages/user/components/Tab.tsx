import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type tabItemProps = {
  label: string;
  path: string;
  currentPath: string;
};

const classNameMappings = {
  active:
    'basis-1/3 rounded-lg px-6pxr py-8pxr shadow-default bg-white hover:bg-white hover:text-gray-700',
  inactive:
    'basis-1/3 rounded-lg px-6pxr py-8pxr text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow',
};

const TabItem = ({ label, path, currentPath }: tabItemProps) => {
  const navigate = useNavigate();
  const isActive = currentPath === path; // 현재 경로와 탭의 경로가 동일한지 확인

  const handleClick = () => {
    navigate(path); // 선택된 탭의 경로로 이동
  };

  return (
    <>
      <li className={classNameMappings[isActive ? 'active' : 'inactive']}>
        <button onClick={handleClick} onKeyDown={handleClick}>
          {label}
        </button>
      </li>
    </>
  );
};

const Tab = () => {
  const location = useLocation();
  const currentPath = location.pathname; // 현재 경로 가져오기

  const tabs = [
    { label: '최근 본 레시피', path: '/user/recent' },
    { label: '나의 레시피', path: '/user/myrecipes' },
    { label: '내 리뷰', path: '/user/myreviews' },
  ];

  return (
    <>
      <div className="mx-14pxr">
        <div className="mt-37pxr p-6pxr w-full rounded-[12px] bg-gray_150 flex flex-row justify-center items-center">
          <ul className="flex flex-row gap-5pxr text-center text-sm text-foot w-full">
            {tabs.map((tab) => (
              <TabItem
                key={tab.path}
                label={tab.label}
                path={tab.path}
                currentPath={currentPath}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Tab;

export const MemoizedTabComponent = memo(Tab);
