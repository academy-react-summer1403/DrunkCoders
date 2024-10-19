import { Badge, Avatar, User } from '@nextui-org/react'
import { MoonIcon, Notification, PencilEdit, SunIcon } from '@assets/index'
import { useDispatch } from 'react-redux'
import { darkModeActions } from '@store'

export function PanelHeader() {
  const dispatch = useDispatch()

  function toggleMode() {
    dispatch(darkModeActions.toggleMode())
  }

  return (
    <header className="rounded-2xl bg-white p-4 dark:bg-black">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Badge
            content={<PencilEdit className="h-[14px] w-[14px]" />}
            color="primary"
            placement="bottom-right"
            showOutline={false}
            className="p-[2px]"
            shape="circle"
          >
            {/* <Avatar
              size="lg"
              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            /> */}
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
          {/* <div>
            <p className='text-xl'> پارسا آقایی</p>
            <p className="text-gray-500">ادمین ، دانشجو</p>
          </div> */}
        </div>
        <div className="flex items-center gap-2">
          <Badge
            content="5"
            placement="bottom-right"
            shape="circle"
            className="text mb-[2px] mr-1 bg-[#FF5454] pt-[2px] text-[13px] font-[100] text-white"
            showOutline={false}
          >
            <div className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border">
              <Notification />
            </div>
          </Badge>
          <div
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border"
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
