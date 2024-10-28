import { Outlet, useNavigate } from 'react-router-dom'
import {
  Listbox,
  ListboxSection,
  ListboxItem,
  Badge,
  Avatar,
} from '@nextui-org/react'
import {
  Accounts,
  Book,
  Dashboard,
  FavBookmark,
  LogOutPanel,
  LongLogo,
  MoonIcon,
  Notification,
  PanelPay,
  ProfilePanel,
  ReservePanel,
  ShortLogo,
} from '@assets/index'
import { useDispatch } from 'react-redux'
import { darkModeActions } from '@store'

export function UseLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate() // Using useNavigate hook

  function toggleMode() {
    dispatch(darkModeActions.toggleMode())
  }

  return (
    <div className="flex  gap-3 bg-[#F0F0F0] p-3">
      <aside className="w-64 rounded-lg bg-white p-4">
        <div className="mb-4 flex items-center gap-2">
          <ShortLogo />
          <LongLogo />
        </div>
        <Listbox
          color="primary"
          variant="solid"
          selectedKeys={'myCourse'}
          defaultSelectedKeys={'myCourse'}
          className="h-[90%]"
          classNames={{
            list: 'h-full gap-4',
          }}
        >
          <ListboxSection title="عمومی">
            <ListboxItem
              key="dashboard"
              onClick={() => navigate('dashboard')}
              className="mt-2 rounded-3xl"
              startContent={<Dashboard />}
            >
              داشبرد
            </ListboxItem>
            <ListboxItem
              key="myCourse"
              onClick={() => navigate('myCourse')}
              className="mt-2 rounded-3xl"
              startContent={<Book />}
            >
              دوره من
            </ListboxItem>
            <ListboxItem
              key="myReservation"
              onClick={() => navigate('myReservation')}
              className="mt-2 rounded-3xl"
              startContent={<ReservePanel />}
            >
              رزرو من
            </ListboxItem>
            <ListboxItem
              key="courseInterest"
              onClick={() => navigate('user-panel/courseInterest')}
              className="mt-2 rounded-3xl"
              startContent={<FavBookmark />}
            >
              علاقه‌مندی دوره
            </ListboxItem>
            <ListboxItem
              key="profile"
              onClick={() => navigate('profile')}
              className="mt-2 rounded-3xl"
              startContent={<ProfilePanel />}
            >
              پروفایل
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="مالی">
            <ListboxItem
              key="payments"
              onClick={() => navigate('payments')}
              className="mt-2 rounded-3xl"
              startContent={<PanelPay />}
            >
              پرداخت ها
            </ListboxItem>
          </ListboxSection>
          <ListboxSection className="mt-auto">
            <ListboxItem
              key="accounts"
              onClick={() => navigate('accounts')}
              className="rounded-3xl border"
              startContent={<Accounts />}
            >
              حساب‌های کابری
            </ListboxItem>
            <ListboxItem
              key="logout"
              onClick={() => navigate('logout')}
              className="mt-2 rounded-3xl border text-danger"
              color="danger"
              startContent={<LogOutPanel />}
            >
              خروج از حساب
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </aside>

      <div className="flex flex-1 flex-col gap-3">
        <div className="rounded-lg bg-white  h-20 p-4">
          <div className="flex items-center  gap-2"></div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2 relative -top-1.5">
              <Badge
                content="5"
                color="primary"
                placement="bottom-right"
                shape="circle"
              >
                <Avatar
                  size="lg"
                  src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                />
              </Badge>
              <div>
                <p>
                  <strong>Name</strong>
                </p>
                <p className="text-gray-500">role</p>
              </div>
            </div>
            <div className="flex items-center relative -top-1.5 gap-2">
              <Badge
                content="5"
                color="danger"
                placement="bottom-right"
                shape="circle"
              >
                <div className="rounded-full h-14 w-14 border p-3">
                  <Notification className="h-7 w-7 relative right-0.5" />
                </div>
              </Badge>
              <div className="rounded-full w-14 h-14 border p-3" onClick={toggleMode}>
                <MoonIcon className="h-7 w-7" />
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 b rounded-lg p-6 pr-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

