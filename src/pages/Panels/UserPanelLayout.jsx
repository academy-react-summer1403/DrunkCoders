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
    <div className="relative flex min-h-screen gap-3 bg-[#E8E8E8] p-3 pb-32 dark:bg-gray-950 sm:pb-3">
      <SideMenu />

      {/* <div className="flex h-full flex-1 flex-col gap-3"> */}
      <div className="flex min-h-full w-full flex-col gap-3">
        <PanelHeader userInfo={userInfo} />

        <main className="flex h-full flex-col rounded-2xl">
          <Outlet context={userInfo} />
        </main>

        <MobileMenu userInfo={userInfo} />
      </div>
    </div>
  )
}
