import {
  Authentication,
  Login,
  Register,
  ForgetPassStep1,
  ForgetPassStep2,
} from '@pages/index'

export const authRoutes = [
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
]
