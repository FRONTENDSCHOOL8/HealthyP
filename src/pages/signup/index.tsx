import { Outlet } from 'react-router-dom';

export { ConfirmVerification } from './ConfirmVerification';
export { Verification } from './Verification';
export { SetProfile } from './SetProfile';
export { Terms } from './Terms';
export { SignupComplete } from './SignupComplete';

export function RegisterLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}