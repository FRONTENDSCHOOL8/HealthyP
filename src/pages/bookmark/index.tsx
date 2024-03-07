import { db } from '@/api/pocketbase';
import LargeCard from '@/components/cards/largeCard/LargeCard';
import { UsersResponse } from '@/types';
import { getDataAtomFamily } from '@/util/data/getDataAtomFamily';
import { useAtom } from 'jotai';
import { useRef } from 'react';

export function BookmarkPage() {
  const urls = useRef<Array<string> | null>(null);
  const profilesUrl = useRef<Array<string> | null>(null);
  const [{ data, loading, error }] = useAtom(
    getDataAtomFamily({
      item: 'recipes',
      typeOfGetData: 'getFullList',
      options: { expand: 'rating, profile' },
    })
  );

  if (data) {
    const urlArr: Array<string> | null = data.map((data: object) =>
      db.files.getUrl(data, (data as { image: string })?.image)
    );
    const profileUrlArr: Array<string> = data.map((data: object) =>
      db.files.getUrl(
        data,
        (data as { expand: { profile: UsersResponse } }).expand.profile?.avatar
      )
    );

    urls.current = urlArr;
    profilesUrl.current = profileUrlArr;
  }

  if (loading)
    return (
      <div>
        <p>스켈레톤 ui 나올듯?</p>
      </div>
    );

  if (error)
    return (
      <div>
        <p>에러</p>
      </div>
    );

  return (
    <div className="w-full h-svh bg-gray-200 overflow-auto ">
      <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">
        {data &&
          data.map((data, idx) => {
            if (data) {
              return (
                <LargeCard
                  key={(data as { id: string })?.id}
                  id={(data as { id: string })?.id}
                  title={(data as { title: string })?.title}
                  type="bookmark"
                  desc={(data as { desc: string })?.desc}
                  rating={(data as { expand: { rating: [] } }).expand?.rating}
                  url={urls.current[idx]}
                  profileImg={profilesUrl.current[idx]}
                  profile={
                    (data as { expand: { profile: UsersResponse } }).expand
                      ?.profile
                  }
                />
              );
            }
          })}
      </div>
    </div>
  );
}
