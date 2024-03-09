import { Provider } from 'jotai';
import { Outlet } from 'react-router-dom';

export { Search } from './Search';
export { Result } from './Result';

export function SearchLayout() {
  return (
    <Provider>
      <Outlet />
    </Provider>
  );
}
