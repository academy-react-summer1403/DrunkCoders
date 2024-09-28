import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <main className="flex">
      {/* Sidebar (visible only on medium and larger screens) */}
      <aside className="hidden md:block md:w-6/12 bg-[#E4E4E4] h-screen">
        <div className='flex mt-25% items-center'>
        <img src="/Untitled-1 2.svg" alt="" className="w-[58px] h-[55px]" />
        <img src="/Untitled-1 3.svg" alt="" className="w-[189px] h-[38px]" />
        </div>
      </aside>

      {/* Main content (full width on smaller screens) */}
      <div className="w-full h-screen flex justify-center ">
        <div className="w-fit mt-15%">
          <h1 className="text-2xl font-bold">👋!خوش برگشتی</h1>
          <br />
          <p className="text-gray-500">
            لطفا برای ورود به پنل خود ایمیل یا شماره همراه و رمزعبور خود را وارد کنید
          </p>
          <br />
          <p>
            حساب کاربری ندارید؟{' '}
            <Link to="register" className="text-primary-blue hover:underline">
              ایجاد حساب کاربری
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export { Login };
