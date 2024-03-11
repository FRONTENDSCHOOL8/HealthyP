import { memo, useEffect, useState } from 'react';
import close from '@/assets/icons/close.svg';
import { Link } from 'react-router-dom';

const liClassName = 'py-10pxr border-b border-gray_150 flex justify-between items-center';

interface RecentSearchProps {
  title: string;
  id: string;
}

function RecentSearchComponent() {
  const [recentSearch, setRecentSearch] = useState<RecentSearchProps[]>([]);

  useEffect(() => {
    const recentSearchRaw = sessionStorage.getItem('recentRecipe');
    const recentSearchData = recentSearchRaw ? JSON.parse(recentSearchRaw) : [];
    setRecentSearch(recentSearchData);
  }, []);

  const handleDelete = (id: string) => {
    const filteredData = recentSearch.filter((item: RecentSearchProps) => item.id !== id);
    sessionStorage.setItem('recentRecipe', JSON.stringify(filteredData));
    setRecentSearch(filteredData);
  };

  return (
    <div className="flex flex-col gap-12pxr">
      <h2 className="text-body-em">최근 찾아본 레시피</h2>
      <ul className="text-sub flex flex-col">
        {recentSearch.map((item: RecentSearchProps, idx: number) => (
          <Link key={idx} to={`/detail/${item.id}`}>
            <li className={liClassName}>
              {item.title}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(item.id);
                }}
                aria-label={`"${item.title}" 레시피 삭제`}
                className="bg-transparent border-none p-0"
              >
                <img src={close} alt="삭제" />
              </button>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export const RecentSearch = memo(RecentSearchComponent);
