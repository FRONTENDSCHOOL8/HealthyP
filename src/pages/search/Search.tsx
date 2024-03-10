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
    <>
      <Header option="searchWithBack" />
      <div className="py-18pxr flex flex-col gap-47pxr px-14pxr pb-140pxr">{renderInit()}</div>
    </>
  );
}

export const Search = memo(SearchPageContent);
