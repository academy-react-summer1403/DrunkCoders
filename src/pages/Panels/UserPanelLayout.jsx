import { PanelHeader, SideMenu } from '@components/index'
import { Outlet } from 'react-router-dom'

export function UserPanelLayout() {
  return (
    <div className="flex h-full gap-3 bg-gray-200 p-3 dark:bg-gray-900">
      <SideMenu />

      <div className="flex flex-1 flex-col gap-3">
        <PanelHeader />

        <main className="flex-1 rounded-2xl bg-white pb-4 dark:bg-black">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
