import {Authentication, Home, Login, NotFound, Register, RootLayout} from '../pages/index'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'

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
        ],
    },
])

export function App() {
    return <RouterProvider router={router} />
}
