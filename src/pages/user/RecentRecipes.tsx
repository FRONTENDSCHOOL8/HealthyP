import { Header } from '@/components';
import Profile from './components/Profile';
import Tab from './components/Tab';

export function RecentRecipes() {
  return (
    <>
      <Header option="onlyAlarm" />
      <Profile />
      <Tab />
    </>
  );
}
