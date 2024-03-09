import { memo } from 'react';
import close from '@/assets/icons/close.svg';

const liClassName =
  'py-10pxr border-b border-gray_150 flex justify-between items-center';

function RecentSearchComponent() {
  return (
    <div className="flex flex-col gap-12pxr">
      <h2 className="text-body-em">최근 검색어</h2>
      <ul className="text-sub flex flex-col">
        <li className={liClassName}>
          최근검색어는
          <img src={close} alt="삭제" />
        </li>
        <li className={liClassName}>
          추후에 로컬스토리지를
          <img src={close} alt="삭제" />
        </li>
        <li className={liClassName}>
          손봐야하기 때문에
          <img src={close} alt="삭제" />
        </li>
        <li className={liClassName}>
          일단 나중에
          <img src={close} alt="삭제" />
        </li>
        <li className={liClassName}>
          하겠습니다
          <img src={close} alt="삭제" />
        </li>
      </ul>
    </div>
  );
}

export const RecentSearch = memo(RecentSearchComponent);
