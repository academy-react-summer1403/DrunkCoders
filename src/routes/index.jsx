import { NotFound } from '@pages/index'
import { authRoutes } from './auth.routes'
import { rootRoutes } from './root.routes'
import { userPanelRoutes } from './userPanel.routes'

export const routes = [
  ...rootRoutes,
  ...authRoutes,
  ...userPanelRoutes,
  { path: '*', element: <NotFound notFound /> },
]
