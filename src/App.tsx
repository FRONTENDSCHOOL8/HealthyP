import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import './styles/style.css';
import './styles/index.css';
import MissingPage from './pages/MissingPage';
import FullPageInfoLayout from './pages/FullPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import ProtectedRoute from './pages/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  Search,
  Result,
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
  SignupComplete,
  DetailPage,
  SearchLayout,
  DetailLayout,
  StepsPage,
  ReviewPage
} from './pages/';
import { isStore } from './stores/stores';

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
        element: <SearchLayout />,
        children: [
          {
            index: true,
            element: <Search />,
          },
          {
            path: 'result',
            element: <Result />,
          },
        ],
      },
      {
        path: 'bookmark',
        element: (
          <ProtectedRoute>
            <BookmarkPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user',
        element: (
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            // path: 'recent',
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
    element: (
      <ProtectedRoute>
        <CreateLayout />
      </ProtectedRoute>
    ),
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
  // 상세 페이지 요리 단계 페이지
  {
    path: '/detail/:recipeId',
    element: (
      <ProtectedRoute>
        <DetailLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DetailPage />
      },
      {
        path: 'steps',
        element: <StepsPage /> 
      }
    ]
  },
  // 리뷰 페이지
  {
    path: '/reviews/:recipeId',
    element: (
      <ProtectedRoute>
        <ReviewPage />
      </ProtectedRoute>
    ),
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
      {
        path: 'complete',
        element: <SignupComplete />,
      },
    ],
  },
  // 풀페이지인포
  {
    path: '/fullPage',
    element: <FullPageInfoLayout />,
  },
]);

const queryClient = new QueryClient();

export default function App() {
  const [, setIsAuth] = useAtom(isStore);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const modelString = localStorage.getItem('pocketbase_auth');
    if (modelString) {
      setIsAuth(true);
    }
    setLoading(false);
  }, [setIsAuth]);

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full max-w-1300pxr h-svh mx-auto bg-white">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}
