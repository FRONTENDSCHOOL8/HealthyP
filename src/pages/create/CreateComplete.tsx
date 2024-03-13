import FullPageInfo from '@/components/FullPageInfo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import check from '@/assets/icons/checkCirclePrimary.svg';

export function CreateComplete() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/main');
    }, 2000);
  });

  return (
    <>
      <FullPageInfo
        icons={[check, '레시피 등록 완료']}
        route={() => '/main'}
        text={['레시피 등록', '완료!']}
        hasDetailedDescription={false}
      />
    </>
  );
}
