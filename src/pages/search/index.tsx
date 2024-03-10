import { Provider } from 'jotai';
import { Search } from './Search';

export function SearchLayout() {
  return (
    <>
      <Provider>
        <Search />
      </Provider>
    </>
  );
}
