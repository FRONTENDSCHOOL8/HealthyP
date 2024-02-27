import { Link, Outlet } from "react-router-dom"


export { MyComments } from './MyComments'
export { MyRecipes } from './MyRecipes'
export { Notifications } from './Notifications'
export { RecentRecipes } from './RecentRecipes'


export function UserLayout() {
  return (
    <div>
      <p className="bg-red-300">This is the user page</p>
      <ul className="flex gap-2">
        <li className="bg-green-300">
          <Link to="recent">Recent</Link>
        </li>
        <li className="bg-blue-300">
          <Link to="myrecipes">My Recipes</Link>
        </li>
        <li className="bg-purple-300">
          <Link to="mycomments">My Comments</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}