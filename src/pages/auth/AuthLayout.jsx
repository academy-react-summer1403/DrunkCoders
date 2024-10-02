import React from 'react';
import ShortLogo from '../../assets/logo/short-Logo.svg?react';
import LongLogo from '../../assets/logo/long-Logo.svg?react';

export function AuthLayout({ children, sideBar }) {
  return (
    <main className="flex md:flex-row flex-col">
      <aside className="flex flex-col md:w-6/12 md:bg-[#E4E4E4] md:h-screen order-1 md:order-none ">
        <div className="flex flex-col md:mt-[25%] md:mr-[10%] m-auto w-fit mt-12 pb-16">
            <div className='md:flex items-center hidden'>
                <ShortLogo className="w-[58px] h-[55px]" />
                <LongLogo className="w-[189px] h-[38px]" />
            </div>
            
            {sideBar && <div className="md:mt-8  flex flex-col gap-8 text-sm text-gray-500">{sideBar}</div>}
        </div>      
      </aside>

      <div className="w-full md:h-screen flex justify-center">
        <div className="w-fit mt-[15%] mx-3">
          {children}
        </div>
      </div>
    </main>
  );
}
