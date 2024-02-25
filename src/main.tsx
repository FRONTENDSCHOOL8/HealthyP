import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import BookmarkPage from './pages/BookmarkPage'
import CreatePage from './pages/CreatePage'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import UserPage from './pages/UserPage'
import MissingPage from './pages/MissingPage'
import GlobalNavigation from './GlobalNavigation'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalNavigation />,
    errorElement: <MissingPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'create',
        element: <CreatePage />,
      },
      {
        path: 'bookmark',
        element: <BookmarkPage />,
      },
      {
        path: 'user',
        element: <UserPage />,
      },
    ],
  }
]);





ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='max-w-[400px] mx-auto bg-white relative h-screen max-h-[700px]'>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
)




// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
