import { MobileMenu, PanelHeader, SideMenu } from '@components/index'
import { getCurrentUserProfile } from '@core/index'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { Outlet } from 'react-router-dom'

export function UserPanelLayout() {
  const { data: userInfo } = useQuery({
    queryKey: ['userProfileInfo'],
    queryFn: getCurrentUserProfile,
  })

  return (
    <div className="relative flex h-full gap-3 bg-gray-100 p-3 pb-32 dark:bg-gray-900 sm:pb-3">
      <AnimatePresence>
        <SideMenu />
      </AnimatePresence>

      <div className="flex h-full flex-1 flex-col gap-3">
        <PanelHeader userInfo={userInfo} />

        <main className="h-full rounded-2xl bg-white pb-4 dark:bg-black">
          <Outlet context={userInfo} />
        </main>

        <MobileMenu />
      </div>
    </div>
  )
}
