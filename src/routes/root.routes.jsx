import {
  Home,
  RootLayout,
  Courses,
  CourseDetail,
  ArticlesDetail,
  Articles,
  ErrorBlock,
} from '@pages/index'

export const rootRoutes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBlock />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: 'courses', element: <Courses /> },
      { path: 'articles', element: <Articles /> },
      { path: 'articles/:id', element: <ArticlesDetail /> },
      {
        path: 'about-us',
      },
      {
        path: 'courses/:id',
        element: <CourseDetail />,
      },
    ],
  },
]
