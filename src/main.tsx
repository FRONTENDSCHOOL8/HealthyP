import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.css';
import './styles/index.css';
import SearchPage from './pages/search/';
import MissingPage from './pages/MissingPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';

import {
  CreateLayout,
  CreateOne,
  CreateTwo,
  BookmarkPage,
  LoginLayout,
  RegisterLayout,
  ConfirmVerification,
  Verification,
  Terms,
  SetProfile,
  MainPage,
  CreateThree,
  CreateComplete,
  Login,
  Welcome,
  MyComments,
  MyRecipes,
  RecentRecipes,
  UserLayout,
} from './pages/';

const router = createBrowserRouter([
  // 루트 페이지 (메인)
  {
    path: '/',
    element: <RootLayout />,
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
        path: 'bookmark',
        element: <BookmarkPage />,
      },
      {
        path: 'user',
        element: <UserLayout />,
        children: [
          {
            path: 'recent',
            element: <RecentRecipes />,
          },
          {
            path: 'myrecipes',
            element: <MyRecipes />,
          },
          {
            path: 'mycomments',
            element: <MyComments />,
          },
        ],
      },
    ],
  },
  // 생성하기
  {
    path: '/create',
    element: <CreateLayout />,
    children: [
      {
        index: true,
        element: <CreateOne />,
      },
      {
        path: 'two',
        element: <CreateTwo />,
      },
      {
        path: 'three',
        element: <CreateThree />,
      },
      {
        path: 'complete',
        element: <CreateComplete />,
      },
    ],
  },
  // 로그인 페이지
  {
    path: '/login',
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'welcome',
        element: <Welcome />,
      },
    ],
  },
  // 회원가입 페이지
  {
    path: '/signup',
    element: <RegisterLayout />,
    children: [
      {
        index: true,
        element: <Terms />,
      },
      {
        path: 'verify',
        element: <Verification />,
      },
      {
        path: 'confirm',
        element: <ConfirmVerification />,
      },
      {
        path: 'setup',
        element: <SetProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="w-[360px] h-[700px] mx-auto bg-gray-100">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
