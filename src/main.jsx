import { createRoot } from 'react-dom/client'
import { App } from './app/App.jsx'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import { store } from '@store'

import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NextUIProvider className="min-h-screen">
      <App />
    </NextUIProvider>
  </Provider>,
)
