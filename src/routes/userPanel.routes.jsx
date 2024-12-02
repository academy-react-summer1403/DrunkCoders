import {
  Financials,
  DashboardPage,
  MyCoursePage,
  MyReservationPage,
  ProfilePage,
  UserPanelLayout,
  FavoriteCourses,
  FavoriteArticles,
  ErrorBlock,
} from '@pages/index'
import { UserPanelRoutesProtector } from './ProtectedRoute'

export const userPanelRoutes = [
  {
    path: '/user-panel',
    element: <UserPanelRoutesProtector route={<UserPanelLayout />} />,
    errorElement: <ErrorBlock />,
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
        path: 'financial',
        element: <Financials />,
      },
      {
        path: 'MyFavoriteArticles',
        element: <FavoriteArticles />,
      },
    ],
  },
]
