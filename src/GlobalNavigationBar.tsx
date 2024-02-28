import { SetStateAction } from 'jotai';
import { Dispatch, useState } from 'react';
import { Link } from 'react-router-dom';

type RouteItem = {
  text: string;
  route: string;
  icon: string;
  iconFill: string;
};

const ROUTER_STATE: RouteItem[] = [
  {
    text: '홈',
    route: '/',
    icon: 'bg-home-icon',
    iconFill: 'bg-home-fill-icon',
  },
  {
    text: '검색하기',
    route: '/search',
    icon: 'bg-search-icon',
    iconFill: 'bg-search-fill-icon',
  },
  {
    text: '생성하기',
    route: '/create',
    icon: 'bg-add-icon',
    iconFill: 'bg-create-fill-icon',
  },
  {
    text: '북마크',
    route: '/bookmark',
    icon: 'bg-bookmark-icon',
    iconFill: 'bg-bookmark-fill-icon',
  },
  {
    text: '마이페이지',
    route: '/user',
    icon: 'bg-person-icon',
    iconFill: 'bg-person-fill-icon',
  },
];

type GNBButtonProps = {
  route: string;
  icon: string;
  iconFill: string;
  text: string;
  currentPage: string;
  setPage: Dispatch<SetStateAction<string>>;
};

function GNBButton({
  route,
  icon,
  iconFill,
  text,
  currentPage,
  setPage,
}: GNBButtonProps) {
  const renderIcon = () => {
    if (currentPage === route) return iconFill;
    return icon;
  };

  return (
    <li className="flex basis-full">
      <Link
        to={route}
        onClick={() => {
          setPage(route);
        }}
        className={`h-full w-full bg-no-repeat bg-[center_top_10px] ${renderIcon()}`}
      >
        <p className="sr-only">{text}</p>
      </Link>
    </li>
  );
}

export default function GlobalNavigationBar() {
  const [currentPage, setCurrentPage] = useState<string>(
    window.location.pathname
  );
  return (
    <nav className="absolute bottom-0 w-full h-80pxr px-side pb-24pxr">
      <ul className="flex flex-row list-none w-full h-full">
        {ROUTER_STATE.map((item, idx) => {
          return (
            <GNBButton
              key={idx}
              currentPage={currentPage}
              setPage={setCurrentPage}
              {...item}
            />
          );
        })}
      </ul>
    </nav>
  );
}
