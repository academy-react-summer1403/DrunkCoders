import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Authentication, Login, Register,NotFound,Home} from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {NextUIProvider} from "@nextui-org/react";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '*',
        element: <NotFound/>,
      },
      {
        path:'about-us'
      },
      {
        index: true,
        path: 'home',
        element: <Home/>
      }
    ],
  },
  {
  path: '/auth',
  element: <Authentication/>,
  children: [
    {
      index:true,
      // path:'login',
      element:<Login/>
    },
    {
      path: 'register',
      element:<Register/>,
    }
  ],
},


])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider dir='rtl'>
    <RouterProvider router={router} />
    </NextUIProvider>
  </StrictMode>,
)
