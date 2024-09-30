import { Link } from 'react-router-dom';
import { Telegram, Instagram, eNamad, Logo } from './index.js';

function SubLogos() {
  return (
    <div className='flex lg:flex-col gap-4'>
      <button className='flex rounded-[64px] gap-2 bg-white p-2 px-3 text-[#FF4242] border-2 border-gray-200'>
        <Instagram />اینستاگرام
      </button>
      <button className='flex rounded-[64px] gap-2 bg-white p-2 px-3 w-fit text-[#3772FF] border-2 border-gray-200'>
        <Telegram />تلگرام
      </button>
    </div>
  );
}

function Explain() {
  return (
    <div className='explain sm:w-[315px] w-[296] sm:ml-10'>
      <h1 className='font-bold text-2xl'>آکادمی کدنویسی بحر</h1>
      <br />
      <p className='text-gray-500 text-justify '>
        +13 سال سابقه فعالیت در زمینه آموزش کدنویسی از سنین کودکی تا بزرگسال. هدف ما همیشه این بوده که دانشجویان را با مهارت‌های لازم برای موفقیت در دنیای فناوری و برنامه نویسی مجهز کنیم.
      </p>
    </div>
  );
}

function Pages() {
  return (
    <div className='pages flex flex-col w-[118px] text-lg'>
      <h1 className='text-gray-500'>صفحات</h1>
      <div className='mt-5 flex flex-col space-y-3 font-[500] '>
      <Link to='/'>خانه</Link>
      <Link to='/courses'>دوره ها</Link>
      <Link to='/article-news'>اخبار و مقالات</Link>
      </div>
    </div>
  );
}

function Us() {
  return (
    <div className='us w-[83px] flex flex-col text-lg'>
      <h1 className='text-gray-500'>ما</h1>
      <div className='mt-5 flex flex-col space-y-3 font-[500]'>
      <Link to='/teachers'>اساتید</Link>
      <Link to='/about-us'>درباره ما</Link>
      <Link to='/contact-us'>ارتباط با ما</Link>
      </div>
    </div>
  );
}

function Namad() {
  return (
    <div className='nama'>
      <img src={eNamad} alt='' height='100px' width='100px' />
    </div>
  );
}

export function Footer() {
  return (
    <footer className='mb-2 px-5 py-12 rounded-[32px] bg-gray-100 '>
      <div className='flex flex-wrap justify-between gap-10 relative'>
        <div className='logo-contact flex flex-col order-1 lg:-order-1 lg:-mt-6'>
          <Logo />
          
        </div>
        <div className='order-6 lg:order-2 lg:absolute lg:-bottom-[35px]'>

        <SubLogos  />
        </div>

        <div className='order-2 ml-16 lg:order-5'>
          <Namad />
        </div>

        <div className='explain order-3 lg:order-2'>
          <Explain />
        </div>

        <div className='pages order-4 lg:order-3'>
          <Pages />
        </div>

        <div className='us order-5 lg:order-4'>
          <Us />
        </div>
      </div>
      <div className='mt-14 mb-8'>
          <hr className='bg-gray-200 order-6 lg:block hidden w-full'/>
      </div>
    </footer>
  );
}
