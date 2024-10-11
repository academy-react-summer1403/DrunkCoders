import { Link, Outlet } from 'react-router-dom';
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";


export function UseLayout () {
  return (
    <div className="flex h-screen gap-3 p-3 bg-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 rounded-lg">
        <Listbox
        color='primary'
        variant='solid'
        className='h-full'
        >
            <ListboxSection title="عمومی">
                <ListboxItem key="dashboard" href='dashboard'> داشبرد</ListboxItem>
                <ListboxItem key="myCourse">دوره من</ListboxItem>
                <ListboxItem key="myReservation">رزرو من</ListboxItem>
                <ListboxItem key="courseInterest">علاقه‌مندی دوره</ListboxItem>
                <ListboxItem key="profile" href="profile">پروفایل</ListboxItem>
            </ListboxSection>
            <ListboxSection title="مالی">
                <ListboxItem key="payments">پرداخت ها</ListboxItem>
            </ListboxSection>
            <ListboxSection >
                <ListboxItem key="accounts"> حساب‌های کابری </ListboxItem>
                <ListboxItem key="logout" className="text-danger" color="danger">خروج از حساب</ListboxItem>
            </ListboxSection>
        </Listbox>
      </aside>

      <div className="flex-1 flex flex-col gap-3">
        <div className="bg-white p-4 rounded-lg">
          <h1>Welcome to your user panel!</h1>
        </div>

        <main className="flex-1 p-6 bg-white rounded-lg">
          <Outlet />  
        </main>
      </div>
    </div>
  );
};
