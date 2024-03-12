import { Provider } from 'jotai';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export { ConfirmVerification } from './ConfirmVerification';
export { Verification } from './Verification';
export { SetProfile } from './SetProfile';
export { Terms } from './Terms';
export { SignupComplete } from './SignupComplete';

export function RegisterLayout() {
  return (
    <>
      <Helmet>
        <title>HealthyP | 회원가입</title>
      </Helmet>
      <Provider>
        <Outlet />
      </Provider>
    </>
  );
}
