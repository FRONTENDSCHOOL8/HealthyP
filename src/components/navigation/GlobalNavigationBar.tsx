import { SetStateAction } from 'jotai';
import { Dispatch, useState } from 'react';
import { Link } from 'react-router-dom';
import home from '@/assets/icons/home.svg';
import homeFill from '@/assets/icons/homeFill.svg';
import search from '@/assets/icons/search.svg';
import searchFill from '@/assets/icons/searchFill.svg';
import create from '@/assets/icons/add.svg';
import createFill from '@/assets/icons/addFill.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import bookmarkFill from '@/assets/icons/bookmarkFill.svg';
import user from '@/assets/icons/person.svg';
import userFill from '@/assets/icons/personFill.svg';

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
    icon: home,
    iconFill: homeFill,
  },
  {
    text: '검색하기',
    route: '/search',
    icon: search,
    iconFill: searchFill,
  },
  {
    text: '생성하기',
    route: '/create',
    icon: create,
    iconFill: createFill,
  },
  {
    text: '북마크',
    route: '/bookmark',
    icon: bookmark,
    iconFill: bookmarkFill,
  },
  {
    text: '마이페이지',
    route: '/user/recent',
    icon: user,
    iconFill: userFill,
  },
];

type GNBButtonProps = {
  route: string;
  icon: string;
  iconFill: string;
  text: string;
  currentPage: string;
  setPage: Dispatch<SetStateAction<string>>;
  profilePicture: string; 
};

function GNBButton({
  route,
  icon,
  iconFill,
  text,
  currentPage,
  setPage,
  profilePicture,
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
        className={`h-full w-full flex justify-center items-center`}
      >
        <img src={renderIcon()} alt="" className={`${route === '/user/recent' ? 'border-2 border-black' : ''} w-30pxr h-30pxr rounded-full object-cover`} />
        <p className="sr-only">{text}</p>
      </Link>
    </li>
  );
}
interface GlobalNavigationProps {
  profilePicture: string;
}

export default function GlobalNavigationBar({profilePicture} : GlobalNavigationProps) {
  const [currentPage, setCurrentPage] = useState<string>(
    window.location.pathname
  );

  if(profilePicture) {

    

    ROUTER_STATE[4] = {
      text: '마이페이지',
      route: '/user/recent',
      icon: profilePicture,
      iconFill: profilePicture,
    }
  }

  return (
    <nav className="fixed bottom-0 w-full h-80pxr px-side pb-24pxr bg-white max-w-1300pxr z-20">
      <ul className="flex flex-row list-none w-full h-full">
        {ROUTER_STATE.map((item, idx) => {
          return (
            <GNBButton
              key={idx}
              currentPage={currentPage}
              setPage={setCurrentPage}
              {...item}
              profilePicture={profilePicture}
            />
          );
        })}
      </ul>
    </nav>
  );
}




