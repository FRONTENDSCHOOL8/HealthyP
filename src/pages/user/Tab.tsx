import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type tabItemProps = {
  index: number;
  children: React.ReactNode;
  isActive: boolean;
  onClick: (index: number) => void;
};

const classNameMappings = {
  active:
    'basis-1/3 rounded-lg px-6pxr py-8pxr shadow-default bg-white hover:bg-white hover:text-gray-700',
  inactive:
    'basis-1/3 rounded-lg px-6pxr py-8pxr text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow',
};

const TabItem = ({ index, isActive, children, onClick }: tabItemProps) => {
  return (
    <>
      <li className={classNameMappings[isActive ? 'active' : 'inactive']}>
        <button
          className="block w-full"
          onClick={() => onClick(index)}
          onKeyDown={() => onClick(index)}
        >
          {children}
        </button>
      </li>
    </>
  );
};

const tabs = [
  { label: '최근 본 레시피', index: 0, path: './' },
  { label: '나의 레시피', index: 1, path: './myrecipes' },
  { label: '내 댓글', index: 2, path: './mycomments' },
];

const Tab = () => {
  const [openedTabIndex, setOpenedTabIndex] = useState(0);
  const navigate = useNavigate();

  const handleTabClick = (index: number) => {
    setOpenedTabIndex(index);
    navigate(tabs[index].path);
  };

  return (
    <>
      <div className="mt-37pxr p-6pxr w-full rounded-[12px] bg-gray_150 flex flex-row justify-center items-center]">
        <ul className="flex flex-row gap-5pxr text-center text-sm text-foot w-full">
          {tabs.map((tab, index) => (
            <TabItem
              key={index}
              index={tab.index}
              isActive={openedTabIndex === tab.index}
              onClick={handleTabClick}
            >
              {tab.label}
            </TabItem>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Tab;
