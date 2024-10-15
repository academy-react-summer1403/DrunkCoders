import { Outlet, useNavigate } from 'react-router-dom';
import { Listbox, ListboxSection, ListboxItem, Badge, Avatar } from "@nextui-org/react";
import { Accounts, Book, Dashboard, FavBookmark, LogOutPanel, LongLogo, MoonIcon, Notification, PanelPay, ProfilePanel, ReservePanel, ShortLogo } from '@assets/index';
import { useDispatch } from 'react-redux';
import { darkModeActions } from '@store';

export function UseLayout () {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Using useNavigate hook

  function toggleMode() {
    dispatch(darkModeActions.toggleMode());
  }

  return (
    <div className="flex h-screen gap-3 p-3 bg-gray-200">
      <aside className="w-64 bg-white p-4 rounded-lg">
        <div className='flex gap-2 items-center mb-4'>
          <ShortLogo />
          <LongLogo />
        </div>
        <Listbox
          color='primary'
          variant='solid'
          className='h-[90%]'
          classNames={{
            list: 'h-full gap-4',
          }}
        >
          <ListboxSection title="عمومی">
            <ListboxItem key="dashboard" onClick={() => navigate('dashboard')} className='mt-2 rounded-3xl' startContent={<Dashboard />}> 
              داشبرد
            </ListboxItem>
            <ListboxItem key="myCourse" onClick={() => navigate('myCourse')} className='mt-2 rounded-3xl' startContent={<Book />}>
              دوره من
            </ListboxItem>
            <ListboxItem key="myReservation" onClick={() => navigate('myReservation')} className='mt-2 rounded-3xl' startContent={<ReservePanel />}>
              رزرو من
            </ListboxItem>
            <ListboxItem key="courseInterest" onClick={() => navigate('user-panel/courseInterest')} className='mt-2 rounded-3xl' startContent={<FavBookmark />}>
              علاقه‌مندی دوره
            </ListboxItem>
            <ListboxItem key="profile" onClick={() => navigate('profile')} className='mt-2 rounded-3xl' startContent={<ProfilePanel />}>
              پروفایل
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="مالی">
            <ListboxItem key="payments" onClick={() => navigate('payments')} className='mt-2 rounded-3xl' startContent={<PanelPay />}>
              پرداخت ها
            </ListboxItem>
          </ListboxSection>
          <ListboxSection className='mt-auto'>
            <ListboxItem key="accounts" onClick={() => navigate('accounts')} className='border rounded-3xl' startContent={<Accounts />}>
              حساب‌های کابری
            </ListboxItem>
            <ListboxItem key="logout" onClick={() => navigate('logout')} className="text-danger mt-2 border rounded-3xl" color="danger" startContent={<LogOutPanel />}>
              خروج از حساب
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </aside>

      <div className="flex-1 flex flex-col gap-3">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center gap-2"></div>
          <div className='flex justify-between'>
            <div className="flex items-center gap-2">
              <Badge content="5" color="primary" placement="bottom-right" shape='circle'>
                <Avatar size="lg" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              </Badge>
              <div>
                <p><strong>Name</strong></p>
                <p className='text-gray-500'>role</p>
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <Badge content="5" color="danger" placement="bottom-right" shape='circle'>
                <div className='p-2 border rounded-full'>
                  <Notification />
                </div>
              </Badge>
              <div className='p-2 border rounded-full' onClick={toggleMode}>
                <MoonIcon />
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 p-6 bg-white rounded-lg">
          <Outlet />  
        </main>
      </div>
    </div>
  );
}
