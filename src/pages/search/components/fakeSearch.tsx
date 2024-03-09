import { searchQuery } from '@/stores/stores';
import { useAtom } from 'jotai';
import { memo } from 'react';

interface FakeSearchComponentProps {
  bgColor?: string;
  value?: string;
}

function FakeSearchComponent({ bgColor }: FakeSearchComponentProps) {
  const [query] = useAtom(searchQuery);
  return (
    <>
      <label htmlFor="search-input" className="sr-only">
        검색
      </label>
      <input
        id="search-input"
        className={`basis-full h-36pxr py-0 px-10pxr bg-gray_150 ${bgColor} rounded-md focus:outline-primary`}
        type="text"
        placeholder="재료, 해시태그, 요리로 검색해주세요"
        defaultValue={query}
      />
    </>
  );
}

export const FakeSearch = memo(FakeSearchComponent);
