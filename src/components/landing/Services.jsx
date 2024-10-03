// import PanelImg from '../../assets/icons/landing-panel.svg?react'
import {
  panelImage,
  CssIcon,
  FigmaIcon,
  JsIcon,
  ReactIcon,
  UxIcon,
  ArrowUpLeft,
} from "@components";

export function Services() {
  return (
    <div className="flex w-full flex-col justify-center gap-4 md:flex-row md:flex-wrap lg:flex-nowrap">
      <div className="relative h-[332px] overflow-hidden rounded-[32px] border-4 pr-4 pt-4 md:basis-[57%] lg:basis-[40%]">
        <h2 className="mb-4 text-2xl font-medium md:text-3xl">
          پنل اختصاصی دانشجو
        </h2>
        <p className="text-[15px]">
          پنل های اختصاصی دانشجو <br /> برای مدیریت دوره ها وتمرین ها
        </p>

        <div className="absolute bottom-0 left-0 h-[85%] w-[450px] xl:w-[90%] 2xl:h-[90%] 2xl:w-[100%]">
          <img src={panelImage} className="h-full w-full object-fill" />
        </div>
      </div>

      <div className="relative flex h-[332px] flex-col rounded-[32px] bg-primary-blue p-4 text-white md:order-1 md:basis-[100%] lg:order-[0] lg:basis-[34%]">
        <h2 className="mb-4 text-xl font-medium md:text-2xl lg:text-[23px]">
          دوره‌های جدید تابستانه!
        </h2>
        <p className="text-[15px]">
          شروع دوره های جدید
          <br /> مبتدی و پیشرفته برای
          <br /> همین تابستان
        </p>

        <div className="flex-1 [direction:ltr]">
          <div className="relative -top-5 h-full w-[210px]">
            <JsIcon className="absolute -right-8 top-0" />
            <CssIcon className="absolute -left-8 -top-2" />
            <UxIcon className="absolute -bottom-8 -right-5" />
            <FigmaIcon className="absolute -bottom-[45px] -right-[22px]" />
            <ReactIcon className="absolute -bottom-[52px] -left-6" />
          </div>
        </div>

        <div className="absolute left-4 top-4 flex h-12 w-12 cursor-pointer items-center rounded-full bg-white">
          <ArrowUpLeft className="mx-auto text-black" />
        </div>
      </div>

      <div className="relative flex h-[332px] flex-col justify-between rounded-[32px] border-4 p-4 md:basis-[40%] lg:basis-[26%]">
        <h2 className="mb-10 text-xl font-medium md:text-2xl">
          درباره ما <br /> بیشتر بخوانید
        </h2>
        <div>
          <div className="mb-8">
            <span className="text-3xl">+1000</span>
            <p className="text-[15px]">دانشجو آنلاین در دوره</p>
          </div>
          <div>
            <span className="text-3xl">+13</span>
            <p className="text-[15px]">سال سابقه آموزشی تخصصی</p>
          </div>
        </div>

        <div className="absolute left-3 top-3 flex h-12 w-12 cursor-pointer items-center rounded-full bg-primary-blue">
          <ArrowUpLeft className="mx-auto text-white" />
        </div>
      </div>
    </div>
  );
}
