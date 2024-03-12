import { Provider } from 'jotai';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export { MyReviews } from './MyReviews';
export { MyRecipes } from './MyRecipes';
export { Notifications } from './Notifications';
export { RecentRecipes } from './RecentRecipes';

export function UserLayout() {
  return (
    <>
      <Provider>
        <Helmet>
          <title>HealthyP | 마이페이지</title>
        </Helmet>
        <Outlet />
      </Provider>
    </>
  );
}
