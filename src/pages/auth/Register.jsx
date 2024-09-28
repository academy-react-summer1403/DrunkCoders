import React from 'react'
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className='flex '>
    <div className='hidden md:block md:w-6/12 bg-[#E4E4E4] h-screen '>
    <div className='flex mt-20% mx-5% items-center'>
      <img src="/Untitled-1 2.svg" alt="" className="w-[58px] h-[55px]" />
      <img src="/Untitled-1 3.svg" alt="" className="w-[189px] h-[38px]" />
    </div>

    </div>

    <div className='w-full h-screen flex justify-center'>
      <div className='w-fit mt-10% sm:mx-5'>
      <h1 className='text-2xl font-bold'>به آکادمی بحر خوش اومدی!😍</h1>
      <br />
      <p className='text-gray-500'>
        لطفاً برای ثبت نام، شماره همراه خود را وارد کنید تا برای شما کد تایید ارسال شود.
      </p>
      <br />
      <p>
        حساب کاربری دارید؟{' '}
        <Link to='/auth/login' className='text-primary-blue hover:underline'>
          ورود به حساب کاربری
        </Link>
      </p>
    </div>

</div>


  </main>
  )
}

export {Register}
