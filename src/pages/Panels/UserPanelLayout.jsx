import { MobileMenu, PanelHeader, SideMenu } from '@components/index'
import { AnimatePresence } from 'framer-motion'
import { Outlet } from 'react-router-dom'

export function UserPanelLayout() {
  return (
    <div className="relative flex h-full gap-3 bg-gray-100 p-3 pb-32 dark:bg-gray-900 sm:pb-3">
      <AnimatePresence>
        <SideMenu />
      </AnimatePresence>

      <div className="flex flex-1 flex-col gap-3">
        <PanelHeader />

        <main className="rounded-2xl pb-4">
          <Outlet />
        </main>

        <MobileMenu />
      </div>
    </div>
  )
}
