import Star from '@/components/star/Star';
import { getDataAtomFamily } from '@/util';
import { useAtom } from 'jotai';

export function MainPage() {
  const [{ data, loading, error }] = useAtom(
    getDataAtomFamily({
      item: 'recipes',
      typeOfGetData: 'getOne',
      options: { expand: 'rating' },
      setting: '5p9kta3jipwrunq',
    })
  );

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
    <div>
      <Star rating={data?.expand.rating} />
    </div>
  );
}
