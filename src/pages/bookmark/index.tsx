import { db } from '@/api/pocketbase';
import { LargeCard } from '@/components';

import getPbImage from '@/util/data/getPBImage';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { RecordModel } from 'pocketbase';
import { useEffect, useState } from 'react';
import { getCurrentUserData } from '@/util';


export function BookmarkPage() {
  const { ref, inView } = useInView({ threshold: 0.7 });
  const [userData, setUserData] = useState<RecordModel>();

  const getRecipeData = async ({ pageParam = 1 }) => {
    const currentUser = getCurrentUserData();
    const userBookmarks = currentUser?.bookmark;
    const conditions = userBookmarks.map((id : string) => {
      return `id = "${id}"`;
    })
    
    const recordsData = await db.collection('recipes').getList(pageParam, 6, { 
      expand: 'rating, profile',
      filter: conditions.join(' || ')
    });
    return recordsData.items;
  };

  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['recipes'],
    queryFn: getRecipeData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('isInview');
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    async function getUserData() {
      const currentUser = localStorage.getItem('pocketbase_auth');
      if (currentUser === null) return;
      const userId = JSON.parse(currentUser).model.id;
      const response = await db.collection('users').getOne(userId, { requestKey: null });
      if (response === undefined) return;
      setUserData(response);
    }

    // fetchData 함수를 호출합니다.
    getUserData();
    db.collection('users').subscribe('*', getUserData);

    return () => {
      db.collection('users').unsubscribe();
    };
  }, []);

  const contents = data?.pages.map((recipes) =>
    recipes.map((recipe, index) => {
      const url = getPbImage('recipes', recipe.id, recipe.image);
      if (recipes.length === index + 1)
        return (
          <LargeCard
            innerRef={ref}
            key={index}
            id={recipe.id}
            userData={userData}
            rating={recipe.expand?.rating}
            url={recipe.image && url}
            desc={recipe.desc}
            title={recipe.title}
            profile={recipe.expand?.profile}
            keywords={recipe.keywords}
          />
        );
      return (
        <LargeCard
          key={index}
          id={recipe.id}
          userData={userData}
          rating={recipe.expand?.rating}
          url={recipe.image && url}
          desc={recipe.desc}
          title={recipe.title}
          profile={recipe.expand?.profile}
          keywords={recipe.keywords}
        />
      );
    })
  );

  if (status === 'pending') return <div>로딩중~~</div>;
  if (status === 'error') return <div>실패 ㅋㅋ</div>;

  return (
    <div className="w-full h-full bg-gray-200 overflow-auto">
      <div className="grid gap-6pxr pb-140pxr grid-cols-card justify-center w-full">{contents}</div>
      {isFetchingNextPage && <p>Loading...</p>}
    </div>
  );
}
