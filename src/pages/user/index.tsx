import { Provider } from 'jotai';
import { Outlet } from 'react-router-dom';

export { MyReviews } from './MyReviews';
export { MyRecipes } from './MyRecipes';
export { Notifications } from './Notifications';
export { RecentRecipes } from './RecentRecipes';

export function UserLayout() {
  return (
    <>
      <Provider>
        <Outlet />
      </Provider>
    </>
  );
}
