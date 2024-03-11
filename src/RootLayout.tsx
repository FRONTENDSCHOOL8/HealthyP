import { Outlet } from 'react-router-dom';

import GlobalNavigationBar from './components/navigation/GlobalNavigationBar';

export default function RootLayout() {

  return (
    <div className="w-full h-full relative">
      <Outlet />
      <GlobalNavigationBar />
    </div>
  );
}
