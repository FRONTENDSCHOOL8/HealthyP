import { SetStateAction } from 'jotai';
import { Dispatch, useEffect, useState } from 'react';
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
import { getCurrentUserData } from '@/util';
import getPbImage from '@/util/data/getPBImage';
import defaultProfile from '@/assets/images/defaultProfile.png';

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

const ROUTER_STATE_AUTH: RouteItem[] = [
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
        className={`h-full w-full flex justify-center items-center`}
      >
        <img src={renderIcon()} alt="" className="w-30pxr h-30pxr rounded-full object-cover" />
        <p className="sr-only">{text}</p>
      </Link>
    </li>
  );
}
interface AuthGNBProps {
  profilePicture: string;
  setPage: Dispatch<SetStateAction<string>>;
  currentPage: string;
}
function AuthGNB({profilePicture, setPage, currentPage} : AuthGNBProps) {
  return (
    <li className="flex basis-full">
      <Link
        to='user/recent'
        onClick={() => {
          setPage('user/recent');
        }}
        className={`h-full w-full flex justify-center items-center`}
        >
        <img src={profilePicture} alt="" className= {`w-30pxr h-30pxr rounded-full object-cover ${currentPage === 'user/recent' ? 'border-2 border-black p-2pxr' : ''}`} />
        <p className="sr-only">마이페이지</p>
      </Link>
    </li>
  )
}


export default function GlobalNavigationBar() {
  const [currentPage, setCurrentPage] = useState<string>(
    window.location.pathname
  );
  const [profileImageURL, setProfileImageURL] = useState('');

  useEffect(() => {
    async function getUserProfilePicture() {
      if(localStorage.getItem("pocketbase_auth")) {
        const currentUser = getCurrentUserData()
        if(currentUser.avatar) {
          setProfileImageURL(getPbImage('users', currentUser.id, currentUser.avatar));
        } else {
          setProfileImageURL(defaultProfile);
        }
      }
    }
    getUserProfilePicture();
}, []);



  return (
    <nav className="fixed bottom-0 w-full h-80pxr px-side pb-24pxr bg-white max-w-1300pxr z-20">
      <ul className="flex flex-row list-none w-full h-full">
        {profileImageURL ? 
          ROUTER_STATE_AUTH.map((item, idx) => {
            return (
              <GNBButton
                key={idx}
                currentPage={currentPage}
                setPage={setCurrentPage}
                {...item}
              />
            );
          })
          :
          ROUTER_STATE.map((item, idx) => {
            return (
              <GNBButton
                key={idx}
                currentPage={currentPage}
                setPage={setCurrentPage}
                {...item}
              />
            );
          })
        }
        {profileImageURL ? <AuthGNB profilePicture={profileImageURL} setPage={setCurrentPage} currentPage={currentPage} /> : <></>}
      </ul>
    </nav>
  );
}
