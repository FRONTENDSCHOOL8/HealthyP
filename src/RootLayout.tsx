import { Outlet } from "react-router-dom"

import GlobalNavigationBar from "./GlobalNavigationBar"

export default function RootLayout() {
  return (
    <div className='max-w-[500px] w-[390px] h-[844px] max-[1000px] relative ml-auto mr-auto'>
      <Outlet />
      <GlobalNavigationBar />
    </div>
    
  )
}