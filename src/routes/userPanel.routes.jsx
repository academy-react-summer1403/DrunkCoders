import {
  Financials,
  DashboardPage,
  MyCoursePage,
  MyReservationPage,
  ProfilePage,
  UserPanelLayout,
  FavoriteCourses,
  FavoriteArticles,
} from '@pages/index'

export const userPanelRoutes = [
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
      // {
      //   path: 'myCourses',
      //   element: <MyCoursePage />,
      // },
      {
        path: 'myReservations',
        element: <MyReservationPage />,
      },
      {
        path: 'MyFavoriteCourses',
        element: <FavoriteCourses />,
      },
      {
        path: 'Financials',
        element: <Financials />,
      },
      {
        path: 'MyFavoriteArticles',
        element: <FavoriteArticles />,
      },
    ],
  },
]
