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
  return (
    <>
      <Header option="searchWithBack" />

      {searchQueryLength === 0 ? (
        <div className="py-18pxr flex flex-col gap-47pxr px-14pxr">
          <MostView />
          <RecentSearch />
        </div>
      ) : (
        <SearchQuery />
      )}
    </>
  );
}

export const Search = memo(SearchPageContent);
