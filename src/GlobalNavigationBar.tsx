import { Link } from "react-router-dom"

export default function GlobalNavigationBar() {
  return (
    <nav className='absolute bottom-0 flex flex-row list-none items-center justify-center pb-[24px] pt-0 px-[14px] w-full border-t-[1px]'>
        <li>
          <Link to="/" className='flex flex-col items-center p-[10px]'>
            <img src='' alt="" />
            <p className='text-xs'>Home</p>
          </Link>
        </li>
        <li>
          <Link to="search" className='flex flex-col items-center p-[10px]'>
            <img src='' alt="" />
            <p className='text-xs'>Search</p>
          </Link>
        </li>
        <li>
          <Link to="create" className='flex flex-col items-center p-[10px]'>
            <img src='' alt="" />
            <p className='text-xs'>Create</p>
          </Link>
        </li>
        <li>
          <Link to="bookmark" className='flex flex-col items-center p-[10px]'>
            <img src='' alt="" />
            <p className='text-xs'>Bookmark</p>
          </Link>
        </li>
        <li>
          <Link to="user" className='flex flex-col items-center p-[10px]'>
            <img src='' alt="" />
            <p className='text-xs'>User</p>
          </Link>
        </li>
      </nav>
  )
}