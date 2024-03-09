import { Provider } from 'jotai';
import { Outlet } from 'react-router-dom';

export { MyComments } from './MyComments';
export { MyRecipes } from './MyRecipes';
export { Notifications } from './Notifications';
export { RecentRecipes } from './RecentRecipes';

export function UserLayout() {
  return (
    <>
      <div className="w-full h-full overflow-auto">
        <Provider>
          <Outlet />
        </Provider>
      </div>
    </>
  );
}
