import { Outlet } from 'react-router-dom';
import FullPageInfo from '@/components/FullPageInfo';
import checkCirclePrimary from '@/assets/icons/checkCirclePrimary.svg';

export default function FullPageInfoLayout() {
  return (
    <>
      <Outlet />
      <FullPageInfo
        route={() => '/'}
        icons={[checkCirclePrimary, '확인']}
        text={['레시피 등록', '완료!']}
        hasDetailedDescription={false}
        // description={[
        //   '확인 메일을 보내드렸어요.',
        //   '이메일 확인 후, 인증 링크를 클릭하시면',
        //   '가입이 완료됩니다!',
        // ]}
      />
    </>
  );
}
