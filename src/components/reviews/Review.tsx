import { DataState, RecipeData } from '@/types';
import { getDataAtomFamily } from '@/util';
import { useAtom } from 'jotai';

export default function Review({
  id,
  caseType,
}: {
  id: string;
  caseType: 'literal' | 'number';
}) {
  const [{ data: recipesData, loading, error }] = useAtom(
    getDataAtomFamily({
      item: 'recipes',
      typeOfGetData: 'getOne',
      options: { expand: 'rating' },
      setting: id,
    })
  );

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;
  if (!recipesData || !('expand' in recipesData && recipesData.expand))
    return <p>데이터를 불러올 수 없습니다.</p>;

  const count: number = recipesData.expand.rating?.length ?? 0;

  const renderText = () => {
    if (caseType === 'literal') {
      return `리뷰 ${count}개`;
    } else if (caseType === 'number') {
      return `(${count > 100 ? '100+' : count})`;
    }
  };

  return (
    <>
      <p className="text-foot">{renderText()}</p>
    </>
  );
}
