import { Link, Outlet } from "react-router-dom"


export { Login } from './Login';
export { Welcome } from './Welcome';

export function LoginLayout() {
  return (
    <div>
      <Link to="test">Click me</Link>
      <p>this is the login page</p>
      <Outlet />
    </div>
  )
}