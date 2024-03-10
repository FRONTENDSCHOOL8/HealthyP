import { Header } from '@/components';
import { searchQuery } from '@/stores/stores';
import { useAtom } from 'jotai';
import { memo } from 'react';
import { MostView } from './components/mostView';
import { RecentSearch } from './components/recentSearch';
import { SearchQuery } from './components/searchQuery';

function SearchPageContent() {
  const [query] = useAtom(searchQuery);

  const searchQueryLength = query.length;
  console.log(query);

  const renderInit = () => {
    if (searchQueryLength === 0) {
      return (
        <>
          <MostView />
          <RecentSearch />
        </>
      );
    }
    return <SearchQuery />;
  };
  return (
    <div className="flex flex-col h-svh">
      <Header option="searchWithBack" />
      <div className="basis-[1fr] overflow-auto px-14pxr pb-120pxr">{renderInit()}</div>
    </div>
  );
}

export const Search = memo(SearchPageContent);
