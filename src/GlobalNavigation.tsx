import { Outlet, Link } from "react-router-dom"



export default function GlobalNavigation() {
  return (
    <div className='max-w-[500px] w-[390px] h-[844px] max-[1000px] relative ml-auto mr-auto'>
      <Outlet />
      <nav className='absolute bottom-0 flex flex-row list-none items-center justify-center gap-16 bg-gray-100 w-full pb-10 pt-2'>
        <li>
          <Link to="/" className='flex flex-col items-center'>
            <img src='' alt="home" />
            <p className='text-xs'>Home</p>
          </Link>
        </li>
        <li>
          <Link to="search" className='flex flex-col items-center'>
            <img src='' alt="search" />
            <p className='text-xs'>Search</p>
          </Link>
        </li>
        <li>
          <Link to="create" className='flex flex-col items-center'>
            <img src='' alt="create" />
            <p className='text-xs'>Create</p>
          </Link>
        </li>
        <li>
          <Link to="bookmark" className='flex flex-col items-center'>
            <img src='' alt="bookmark" />
            <p className='text-xs'>Bookmark</p>
          </Link>
        </li>
        <li>
          <Link to="user" className='flex flex-col items-center'>
            <img src='' alt="user" />
            <p className='text-xs'>User</p>
          </Link>
        </li>
      </nav>
    </div>
    
  )
}