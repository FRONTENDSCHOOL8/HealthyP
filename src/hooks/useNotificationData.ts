import { db } from '@/api/pocketbase';
import { countNotificationAtom, userRecordId } from '@/stores/stores';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const useCheckNotification = () => {
  const [id] = useAtom(userRecordId);
  const [countNotification, setCountNotification] = useAtom(countNotificationAtom);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const getNotificationData = async () =>
          await db.collection('notifications').getFullList({
            expand: 'recipe, review, review.creator',
            filter: `recipe.profile="${id}" && is_read=false`,
            sort: '-created',
          });
        const notificationData = await getNotificationData();
        const countNotify = notificationData.length;

        setCountNotification(countNotify.toString());
      };

      fetchData();
    }
  }, [id, setCountNotification]);

  const countInt = parseInt(countNotification, 10);

  const hasNotification = countInt > 0;

  return { countNotification, setCountNotification, hasNotification };
};

export default useCheckNotification;
