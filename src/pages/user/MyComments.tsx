import { Header } from '@/components';
import Profile from './components/Profile';
import Tab from './components/Tab';

export function MyComments() {
  return (
    <>
      <Header option="onlyAlarm" />
      <Profile />
      <Tab />
    </>
  );
}
