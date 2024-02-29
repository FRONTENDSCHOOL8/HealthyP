import { InputComponent } from '@/components';
import Header from '@/components/header/Header';
import { Outlet } from 'react-router-dom';

export { Login } from './Login';
export { Welcome } from './Welcome';

export function LoginLayout() {
  return (
    <>
      <Header option="titleWithClose" title="회원가입" />
      <div role="group" className="mx-14pxr mt-18pxr mb-198pxr">
        <InputComponent option="email" />
      </div>
      <Outlet />
    </>
  );
}
