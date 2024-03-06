import { Header } from '@/components';
import { Outlet } from 'react-router-dom';
import Profile from './components/Profile';
import Tab from './components/Tab';

export { MyComments } from './MyComments';
export { MyRecipes } from './MyRecipes';
export { Notifications } from './Notifications';
export { RecentRecipes } from './RecentRecipes';

export function UserLayout() {
  return (
    <>
      <Header option="onlyAlarm" />
      <Profile />
      <Tab />
      <Outlet />
    </>
  );
}
