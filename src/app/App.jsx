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
import { QueryClient } from "../../node_modules/@tanstack/query-core/src/queryClient";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";

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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
