import React from 'react';
import ShortLogo from '../../assets/logo/short-Logo.svg?react';
import LongLogo from '../../assets/logo/long-Logo.svg?react';

export function AuthLayout({ children, sideBar }) {
  return (
    <main className="flex">
      <aside className="hidden md:block md:w-6/12 bg-[#E4E4E4] h-screen">
        <div className="flex flex-col mt-[25%] mr-[10%]">
            <div className='flex items-center'>
                <ShortLogo className="w-[58px] h-[55px]" />
                <LongLogo className="w-[189px] h-[38px]" />
            </div>
            
            {sideBar && <div className="mt-8 flex flex-col gap-8 text-sm text-gray-500">{sideBar}</div>}
        </div>      
      </aside>

      <div className="w-full h-screen flex justify-center">
        <div className="w-fit mt-[15%] mx-3">
          {children}
        </div>
      </div>
    </main>
  );
}
