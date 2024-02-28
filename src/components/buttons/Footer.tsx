import Button from './Button';

const Footer = (): JSX.Element => {
  return (
    <div className="absolute bottom-0 w-full bg-white pt-14pxr px-14pxr pb-48pxr">
      <Button
        text={['검색', '유저']}
        buttonCase="small"
        route={[
          () => '/search', // 첫 번째 버튼 경로
          () => '/user', // 두 번째 버튼 경로
        ]}
      />
      <Button
        text={['이전', '다음']}
        buttonCase="medium"
        route={[
          () => '/search', // 첫 번째 버튼 경로
          () => '/user', // 두 번째 버튼 경로
        ]}
      />
      <Button
        text={['박장군']}
        buttonCase="large"
        route={[
          () => '/search', // 첫 번째 버튼 경로
        ]}
      />
    </div>
  );
};

export default Footer;
