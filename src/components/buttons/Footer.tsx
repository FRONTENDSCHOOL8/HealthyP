import { ErrorBoundary } from 'react-error-boundary';
import Button, { ErrorFallback } from './Button';

const Footer = (): JSX.Element => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="absolute bottom-0 w-full bg-white pt-14pxr px-14pxr pb-48pxr">
        <Button
          text={['북마크']}
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
          text={['박예진', '박장군']}
          buttonCase="medium"
          route={[
            () => '/search', // 첫 번째 버튼 경로
            () => '/user', // 두 번째 버튼 경로
          ]}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Footer;
