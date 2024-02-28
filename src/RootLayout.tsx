import { Outlet } from 'react-router-dom';

import GlobalNavigationBar from './components/GlobalNavigationBar';

export default function RootLayout() {
  return (
    <div className="w-full h-full relative">
      <Outlet />
      <GlobalNavigationBar />
    </div>
  );
}
