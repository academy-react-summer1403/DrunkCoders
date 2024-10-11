import { ArrowDownDouble, glassyTwisted, Start1, Start2 } from '@assets/index'

export function CoursesHeroSection() {
  return (
    <div className="mx-auto flex w-[350px] flex-col items-center justify-center gap-8 pb-16 pt-20 text-center sm:w-[538px]">
      <div className="relative w-full text-center">
        <h1 className="text-center text-5xl">دوره های متنوع!</h1>
        <Start1 className="absolute -bottom-5 -right-12" />
        <Start2 className="absolute -top-10 left-2" />
      </div>

      <div className="relative">
        <p className="text-xl leading-normal text-[#787878]">
          ما به شما تنوعی از دوره‌های آموزشی تخصصی را ارائه می‌دهیم که به شما
          کمک می‌کند تا مهارت‌های برنامه‌نویسی و کدنویسی خود را به سطح بالاتری
          برسانید.
        </p>
        <img
          src={glassyTwisted}
          alt="glassy twisted"
          className="absolute -bottom-2 -left-28 hidden md:block"
        />
      </div>

      <div className="flex flex-col items-center gap-2 text-[#787878]">
        <p> لیست دوره ها </p>
        <ArrowDownDouble />
      </div>
    </div>
  )
}
