import { Outlet } from 'react-router-dom';

import GlobalNavigationBar from './components/navigation/GlobalNavigationBar';
import { useEffect, useState } from 'react';
import { getCurrentUserData } from './util';
import getPbImage from './util/data/getPBImage';
import defaultProfile from '@/assets/images/defaultProfile.png';

export default function RootLayout() {
  const [profileImageURL, setProfileImageURL] = useState('');

  useEffect(() => {
    async function getUserProfilePicture() {
      if(localStorage.getItem("pocketbase_auth")) {
        const currentUser = getCurrentUserData()

        if(getPbImage('users', currentUser.id, 'avatar')) {
          setProfileImageURL(getPbImage('users', currentUser.id, currentUser.avatar));
        } else {
          setProfileImageURL(defaultProfile);
        }
      }
    }
    getUserProfilePicture();
  }, [])


  return (
    <div className="w-full h-full relative">
      <Outlet />
      <GlobalNavigationBar profilePicture={profileImageURL}/>
    </div>
  );
}
