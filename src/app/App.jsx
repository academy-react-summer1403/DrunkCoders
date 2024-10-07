import {
  Authentication,
  Home,
  Login,
  NotFound,
  Register,
  RootLayout,
  ForgetPass,
  Courses,
  CourseD
} from "@pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";
import { useSelector } from "react-redux";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "about-us",
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
      }
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forget-pass",
        element: <ForgetPass />,
      },
    ],
  },

]);

export function App() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={`bg-background text-foreground ${darkMode ? "dark" : "light"}`}
      >
        <RouterProvider router={router} />
      </main>
    </QueryClientProvider>
  );
}
