import {
  Authentication,
  Home,
  Login,
  NotFound,
  Register,
  RootLayout,
  ForgetPassStep1,
  ForgetPassStep2,
  Courses,
  DashboardPage,
  MyCoursePage,
  MyReservationPage,
  ProfilePage,
  UserPanelLayout,
  FavoriteCourses,
  FavoriteArticles,
} from '@pages/index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './App.css'
import { useSelector } from 'react-redux'
import { Articles } from '@pages/Articles'

export const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: 1000 * 60 * 30 } },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: 'courses', element: <Courses /> },
      { path: 'articles', element: <Articles /> },

      {
        path: 'about-us',
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Authentication />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forget-pass',
        element: <ForgetPassStep1 />,
      },
      {
        path: 'forget-pass/:configValue',
        element: <ForgetPassStep2 />,
      },
    ],
  },
  {
    path: '/user-panel',
    element: <UserPanelLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'myCourses',
        element: <MyCoursePage />,
      },
      {
        path: 'myReservations',
        element: <MyReservationPage />,
      },
      {
        path: 'MyFavoriteCourses',
        element: <FavoriteCourses />,
      },
      {
        path: 'MyFavoriteArticles',
        element: <FavoriteArticles />,
      },
    ],
  },
])

export function App() {
  const darkMode = useSelector((state) => state.darkMode.darkMode)
  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={`bg-background text-foreground ${darkMode ? 'dark' : 'light'}`}
      >
        <RouterProvider router={router} />
      </main>
    </QueryClientProvider>
  )
}
