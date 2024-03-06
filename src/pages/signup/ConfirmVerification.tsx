import FullPageInfo from '@/components/FullPageInfo';
import emailCirclePrimary from '@/assets/icons/emailCirclePrimary.svg';

export function ConfirmVerification() {
  return (
    <FullPageInfo
      route={() => '/signup/setup'}
      icons={[emailCirclePrimary, '이메일']}
      text={['이메일 인증을', '확인해주세요']}
      hasDetailedDescription={true}
      description={[
        '확인 메일을 보내드렸어요',
        '이메일 확인 후, 인증 링크를 클릭하시면',
        '가입이 완료됩니다!',
      ]}
      isSetTimeout={true}
    />
  );
}
