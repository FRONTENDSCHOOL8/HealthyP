import { SetStateAction } from 'jotai';
import { Dispatch, useState } from 'react';
import { Link } from 'react-router-dom';

type RouteItem = {
  name: string;
  route: string;
  icon: string;
  iconFill: string;
};

const ROUTER_STATE: RouteItem[] = [
  {
    name: '홈',
    route: '/',
    icon: 'bg-home-icon',
    iconFill: 'bg-home-fill-icon',
  },
  {
    name: '검색하기',
    route: 'search',
    icon: 'bg-search-icon',
    iconFill: 'bg-search-fill-icon',
  },
  {
    name: '생성하기',
    route: 'create',
    icon: 'bg-add-icon',
    iconFill: 'bg-create-fill-icon',
  },
  {
    name: '북마크',
    route: 'bookmark',
    icon: 'bg-bookmark-icon',
    iconFill: 'bg-bookmark-fill-icon',
  },
  {
    name: '마이페이지',
    route: 'user',
    icon: 'bg-person-icon',
    iconFill: 'bg-person-fill-icon',
  },
];

type GNBButtonProps = {
  route: string;
  icon: string;
  iconFill: string;
  name: string;
  currentPage: string;
  setPage: Dispatch<SetStateAction<string>>;
};

function GNBButton({
  route,
  icon,
  iconFill,
  name,
  currentPage,
  setPage
}: GNBButtonProps) {
  return (
    <li className="flex basis-full bg-red-100">
      <Link
        to={route}
        onClick={() => {
          setPage(route)
        }}
        className={`h-full w-full bg-no-repeat bg-[center_top_10px] ${currentPage === route ? iconFill : icon}`}
      >
        <p className="sr-only">{name}</p>
      </Link>
    </li>
  );
}

export default function GlobalNavigationBar() {
  const [currentPage, setCurrentPage] = useState<string>('홈');
  return (
    <nav className="absolute bottom-0 w-full h-80pxr px-14pxr pb-24pxr">
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

