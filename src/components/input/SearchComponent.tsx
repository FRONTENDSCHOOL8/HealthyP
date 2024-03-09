import { searchQuery } from '@/stores/stores';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

interface SearchComponentProps {
  bgColor?: string;
  changeHandler?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export default function SearchComponent({ bgColor }: SearchComponentProps) {
  const [query, setQuery] = useAtom(searchQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery]);

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
        onChange={handleChange}
        value={query}
      />
    </>
  );
}
