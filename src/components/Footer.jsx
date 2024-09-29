import { Link } from 'react-router-dom'
import { Telegram, Instagram, eNamad, Logo } from './index.js'
export function Footer() {
    return (
<footer className='mb-2 p-5 py-8 rounded-2xl bg-gray-100 
    grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-4'>
      <div className='logo-contact'>
        <Logo />
        <br />
        <button className='flex rounded-[64px] bg-white p-2 -my-2 px-3 text-[#FF4242]'>
          <Instagram />اینستاگرام
        </button>
        <br />
        <button className='flex rounded-[64px] bg-white p-2 px-3 w-fit text-[#3772FF]'>
          <Telegram />تلگرام
        </button>
      </div>

      <div className='explain w-full'>
        <h1 className='font-bold text-lg'>آکادمی کدنویسی بحر</h1>
        <br />
        <p className='text-gray-500 text-justify'>
          +13 سال سابقه فعالیت در زمینه آموزش کدنویسی از سنین کودکی تا بزرگسال. هدف ما همیشه این بوده که دانشجویان را با مهارت های لازم برای موفقیت در دنیای فناوری و برنامه نویسی مجهز کنیم.
        </p>
      </div>

      <div className='pages'>
        <h1 className='text-gray-500'>صفحات</h1>
        <br />
        <Link to='/'>خانه</Link>
        <br />
        <Link to='/courses'>دوره ها</Link>
        <br />
        <Link to='/article-news'>اخبار و مقالات</Link>
      </div>

      <div className='us'>
        <h1 className='text-gray-500'>ما</h1>
        <br />
        <Link to='/teachers'>اساتید</Link>
        <br />
        <Link to='/about-us'>درباره ما</Link>
        <br />
        <Link to='/contact-us'>ارتباط با ما</Link>
      </div>

      <div className='nama'>
        نما
        <img src={eNamad} alt="" height='100px' width='100px' />
      </div>
    </footer>

    )
}

