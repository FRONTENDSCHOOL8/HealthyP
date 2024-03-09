import { db } from '@/api/pocketbase';
import { memo, useEffect, useState } from 'react';
import { ListResult, RecordModel } from 'pocketbase';
import { Link } from 'react-router-dom';

function MostViewComponent() {
  const [mostView, setMostView] = useState<ListResult<RecordModel>>();

  useEffect(() => {
    const fetchMostView = async () => {
      const getMostView = async () =>
        await db.collection('recipes').getList(1, 5, { sort: '-views' });
      const mostViewData: ListResult<RecordModel> = await getMostView();
      setMostView(mostViewData);
    };

    fetchMostView();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-18pxr">
        <h2 className="text-body-em">많이 찾아본 레시피</h2>
        <ul className="flex gap-6pxr overflow-x-auto whitespace-nowrap no-scrollbar">
          {mostView?.items &&
            mostView?.items.map((data, idx) => {
              if (data) {
                return (
                  <Link key={idx} to={`/detail/${data.id}`}>
                    <li className="px-12pxr py-8pxr border border-gray_200 rounded-[20px] text-sub">
                      {data.title}
                    </li>
                  </Link>
                );
              }
            })}
        </ul>
      </div>
    </>
  );
}

export const MostView = memo(MostViewComponent);
