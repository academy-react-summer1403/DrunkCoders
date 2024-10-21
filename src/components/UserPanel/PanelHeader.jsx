import { Badge, Avatar, User } from '@nextui-org/react'
import {
  Dashboard,
  MoonIcon,
  Notification,
  PencilEdit,
  ShortLogo,
  SunIcon,
  bahrLogoImg,
} from '@assets/index'
import { useDispatch } from 'react-redux'
import { darkModeActions } from '@store'

export function PanelHeader() {
  const dispatch = useDispatch()

  function toggleMode() {
    dispatch(darkModeActions.toggleMode())
  }

  function handleOpenMenu() {
    dispatch(darkModeActions.toggleUserPanelSideBar())
  }

  return (
    <header className="bgg-white rounded-2xl p-2 sm:bg-white sm:p-4 sm:dark:bg-black">
      <div className="flex justify-between">
        <div className="flexC sm:hidden">
          <img src={bahrLogoImg} />
        </div>

        <div className="hidden items-center sm:flex">
          <span
            onClick={handleOpenMenu}
            className="ml-10 cursor-pointer rounded-lg p-1 transition-all hover:bg-primary-blue xl:hidden"
          >
            <Dashboard className="h-9 w-9" />
          </span>

          <Badge
            content={<PencilEdit className="h-[14px] w-[14px]" />}
            color="primary"
            placement="bottom-right"
            showOutline={false}
            className="p-[2px]"
            shape="circle"
          >
            <User
              name="پارسا آقایی"
              description="ادمین ، دانشجو"
              avatarProps={{
                src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                size: 'lg',
              }}
              classNames={{
                name: 'text-lg mb-1',
                description: 'text-sm font-light',
              }}
            />
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            content="5"
            placement="bottom-right"
            shape="circle"
            className="text mb-[2px] mr-1 bg-[#FF5454] pt-[2px] text-[13px] font-[100] text-white"
            showOutline={false}
          >
            <div className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white dark:bg-black sm:border sm:bg-none sm:dark:bg-none">
              <Notification />
            </div>
          </Badge>
          <div
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white dark:bg-black sm:border sm:bg-none sm:dark:bg-none"
            onClick={toggleMode}
          >
            <MoonIcon className="absolute z-20 dark:hidden" />
            <SunIcon className="absolute h-8 w-8" />
          </div>
        </div>
      </div>
    </header>
  )
}
