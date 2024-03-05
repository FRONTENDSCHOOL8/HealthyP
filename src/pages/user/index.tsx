import { Header } from '@/components';
import { Outlet } from 'react-router-dom';
import Profile from './Profile';
import Tab from './Tab';

export { MyComments } from './MyComments';
export { MyRecipes } from './MyRecipes';
export { Notifications } from './Notifications';
export { RecentRecipes } from './RecentRecipes';

export function UserLayout() {
  return (
    <div className="mx-14pxr flex flex-col justify-center items-center">
      <Header option="onlyAlarm" />
      <Profile />
      <Tab />
      <Outlet />
    </div>
  );
}
