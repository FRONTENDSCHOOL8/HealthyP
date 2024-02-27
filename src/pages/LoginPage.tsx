import { Link, Outlet } from "react-router-dom"


export default function LoginPage() {
  return (
    <div>
      <Link to="test">Click me</Link>
      <p>this is the login page</p>
      <Outlet />
    </div>
  )
}