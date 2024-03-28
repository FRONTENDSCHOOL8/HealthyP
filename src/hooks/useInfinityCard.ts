import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { RecordModel } from 'pocketbase';
import { db } from '@/api/pocketbase';
import { useInView } from 'react-intersection-observer';

export function useInifinityCard(callbackFn: (pageParam: { pageParam: number | undefined }) => Promise<RecordModel[]>) {
  const { ref, inView } = useInView({ threshold: 0.7 });
  const [userData, setUserData] = useState<RecordModel>();
  const [isLoading, setIsLoading] = useState(true);

  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['recipes'],
    queryFn: callbackFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    async function getUserData() {
      try {
        setIsLoading(true);
        console.log(isLoading);

        const currentUser = localStorage.getItem('pocketbase_auth');
        if (currentUser === null) return;
        const userId = JSON.parse(currentUser).model.id;
        const response = await db.collection('users').getOne(userId, { requestKey: null });
        if (response === undefined) return;
        setUserData(response);
      } finally {
        setIsLoading(false);
        console.log(isLoading);
      }
    }

    getUserData();
    db.collection('users').subscribe('*', getUserData);

    return () => {
      db.collection('users').unsubscribe();
    };
  }, []);

  return { data, status, isFetchingNextPage, userData, ref, isLoading };
}
