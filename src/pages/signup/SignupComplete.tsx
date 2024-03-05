import FullPageInfo from '@/components/FullPageInfo';
import checkCirclePrimary from '@/assets/icons/checkCirclePrimary.svg';

export function SignupComplete() {
  return (
    <FullPageInfo
      icons={[checkCirclePrimary, '회원가입 완료']}
      text={['축하드립니다', '가입 완료!']}
      route={() => '/'}
      hasDetailedDescription={false}
    />
  );
}
