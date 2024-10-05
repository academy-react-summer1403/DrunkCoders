import {
  Authentication,
  Home,
  Login,
  NotFound,
  Register,
  RootLayout,
  ForgetPass,
} from "@pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";

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

  console.log(darkMode);

  return (
    <main
      className={`bg-background text-foreground ${darkMode ? "dark" : "light"}`}
    >
      <RouterProvider router={router} />
    </main>
  );
}
