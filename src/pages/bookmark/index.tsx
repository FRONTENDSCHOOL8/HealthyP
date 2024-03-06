import { pb } from '@/api/pocketbase';
import LargeCard from '@/components/cards/largeCard/LargeCard';
import { getDataAtomFamily } from '@/util/data/getDataAtomFamily';
import { useAtom } from 'jotai';
import { useRef } from 'react';

export function BookmarkPage() {
  const urls = useRef<[]>(null);
  const profilesUrl = useRef<[]>(null);
  const [{ data, loading, error }] = useAtom(
    getDataAtomFamily({
      item: 'recipes',
      typeOfGetData: 'getFullList',
      options: { expand: 'rating, profile' },
    })
  );

  if (data) {
    const urlArr = data.map((data: object) =>
      pb.files.getUrl(data, data?.image)
    );
    const profileUrlArr = data.map((data: object) =>
      pb.files.getUrl(data, data.expand.profile?.avatar)
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
    <div className="flex flex-col h-svh gap-6pxr w-svw overflow-auto pb-140pxr bg-gray-200">
      {data.map((data, idx) => {
        if (data) {
          return (
            <LargeCard
              key={data?.id}
              {...data}
              rating={data?.expand?.rating}
              url={urls.current[idx]}
              profileImg={profilesUrl.current[idx]}
              profile={data?.expand?.profile}
            />
          );
        }
      })}
      <p>bookmark</p>
    </div>
  );
}
