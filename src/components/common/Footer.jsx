import { Link } from 'react-router-dom'
import { Telegram, Instagram, eNamad, Logo } from '@assets'

function SubLogos() {
  return (
    <div className="flex gap-4 lg:flex-col">
      <button className="flex gap-2 rounded-[64px] border-2 border-gray-200 bg-white p-2 px-3 text-[#FF4242]">
        <Instagram />
        اینستاگرام
      </button>
      <button className="flex w-fit gap-2 rounded-[64px] border-2 border-gray-200 bg-white p-2 px-3 text-[#3772FF]">
        <Telegram />
        تلگرام
      </button>
    </div>
  )
}

function Explain() {
  return (
    <div className="explain w-[296] sm:ml-10 sm:w-[315px]">
      <h1 className="text-2xl font-bold">آکادمی کدنویسی بحر</h1>
      <br />
      <p className="text-justify text-gray-500 dark:text-white/60">
        +13 سال سابقه فعالیت در زمینه آموزش کدنویسی از سنین کودکی تا بزرگسال.
        هدف ما همیشه این بوده که دانشجویان را با مهارت‌های لازم برای موفقیت در
        دنیای فناوری و برنامه نویسی مجهز کنیم.
      </p>
    </div>
  )
}

function Pages() {
  return (
    <div className="pages flex w-[118px] flex-col text-lg">
      <h1 className="text-gray-500 dark:text-white">صفحات</h1>
      <div className="mt-5 flex flex-col space-y-3 font-[500]">
        <Link to="/">خانه</Link>
        <Link to="/courses">دوره ها</Link>
        <Link to="/article-news">اخبار و مقالات</Link>
      </div>
    </div>
  )
}

function Us() {
  return (
    <div className="us flex w-[83px] flex-col text-lg">
      <h1 className="text-gray-500 dark:text-white">ما</h1>
      <div className="mt-5 flex flex-col space-y-3 font-[500]">
        <Link to="/teachers">اساتید</Link>
        <Link to="/about-us">درباره ما</Link>
        <Link to="/contact-us">ارتباط با ما</Link>
      </div>
    </div>
  )
}

function Namad() {
  return (
    <div className="nama">
      <img src={eNamad} alt="" height="100px" width="100px" />
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mb-2 mt-20 rounded-[32px] bg-gray-100 px-5 py-12 dark:bg-white/20">
      <div className="relative flex flex-wrap justify-between gap-10">
        <div className="logo-contact order-1 flex flex-col lg:-order-1 lg:-mt-6">
          <Logo />
        </div>
        <div className="order-6 lg:-bottom-[35px] lg:order-2 footer-lg:absolute">
          <SubLogos />
        </div>

        <div className="order-2 ml-16 lg:order-5">
          <Namad />
        </div>

        <div className="explain order-3 lg:order-2">
          <Explain />
        </div>

        <div className="pages order-4 lg:order-3">
          <Pages />
        </div>

        <div className="us order-5 lg:order-4">
          <Us />
        </div>
      </div>
      <div className="mb-8 mt-14">
        <hr className="order-6 hidden w-full bg-gray-200 lg:block" />
      </div>
    </footer>
  )
}
