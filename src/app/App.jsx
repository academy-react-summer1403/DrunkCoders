import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './App.css'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { routes } from '../routes/index.jsx'
import { BackToTop } from '@components/index'

export const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: 1000 * 60 * 30 } },
})

const router = createBrowserRouter(routes)

export function App() {
  const darkMode = useSelector((state) => state.darkMode.darkMode)

  if (darkMode) {
    document.body.classList.add('dark')
  } else {
    if (document.body.classList.contains('dark'))
      document.body.classList.toggle('dark')
  }

  /* document.addEventListener(
    'scroll',
    (event) => {
      const scrollingElement = event.target
      console.log('Scrolling element:', scrollingElement)
    },
    true,
  ) */

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: '#CAFFB9',
            },
          },
          error: {
            style: {
              background: '#FF7474',
            },
          },
        }}
      />
    </QueryClientProvider>
  )
}
