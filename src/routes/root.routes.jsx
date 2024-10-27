import {
  Home,
  RootLayout,
  Courses,
  CourseDetail,
  ArticlesDetail,
  Articles,
} from '@pages/index'

export const rootRoutes = [
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
