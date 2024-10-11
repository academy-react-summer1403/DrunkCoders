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
  CourseD,
  UserPanel,
} from "@pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";
import { useSelector } from "react-redux";

export const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: 'about-us',
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path:"courses",
        element: <Courses/>,
        children: [
          {
            path:'details',
            element: <CourseD/>
          }
        ]
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
    path:'/user-panel',
    element: <UserPanel/>,
  }
]);

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
