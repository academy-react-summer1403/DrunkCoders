// import PanelImg from '../../assets/icons/landing-panel.svg?react'
import {
    panelImage,
    CssIcon,
    FigmaIcon,
    JsIcon,
    ReactIcon,
    UxIcon,
    ArrowUpLeft,
} from '../../assets/index'

export function Services() {
    return (
        <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-center  gap-4 w-full sm">
            <div className="md:basis-[57%] lg:basis-[44%] border-4 pt-4 pr-4 rounded-[32px] relative  overflow-hidden h-[332px]">
                <h2 className="lg:text-3xl text-2xl font-medium mb-4">پنل اختصاصی دانشجو</h2>
                <p className="text-[15px]">
                    پنل های اختصاصی دانشجو <br /> برای مدیریت دوره ها وتمرین ها
                </p>

                <div className="absolute bottom-0 left-0 w-[450px] xl:w-[90%] 2xl:w-[100%]  h-[85%] xl:h-[90%] 2xl:h-[95%]">
                    <img src={panelImage} className=" object-fill w-full h-full" />
                </div>
            </div>

            <div className="md:basis-[100%] md:order-1 lg:order-[0] lg:basis-[34%]  text-white p-4 bg-primary-blue rounded-[32px] relative flex flex-col h-[332px]">
                <h2 className="text-xl lg:text-2xl font-medium mb-4">دوره‌های جدید تابستانه!</h2>
                <p className="text-[15px]">
                    شروع دوره های جدید
                    <br /> مبتدی و پیشرفته برای
                    <br /> همین تابستان
                </p>

                <div className="[direction:ltr] flex-1">
                    <div className=" h-full relative w-[210px] -top-5">
                        <JsIcon className="absolute top-0 -right-8" />
                        <CssIcon className="absolute -top-2 -left-8" />
                        <UxIcon className="absolute -bottom-8 -right-5" />
                        <FigmaIcon className="absolute -bottom-[45px] -right-[22px]" />
                        <ReactIcon className="absolute -bottom-[52px] -left-6" />
                    </div>
                </div>

                <div className="bg-white rounded-full w-12 h-12 flex items-center absolute top-4 left-4 cursor-pointer">
                    <ArrowUpLeft className="mx-auto text-black" />
                </div>
            </div>

            <div className="md:basis-[40%] lg:basis-[22%] border-4 p-4 rounded-[32px] flex flex-col justify-between relative h-[332px]">
                <h2 className="text-xl lg:text-2xl font-medium mb-10">
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

                <div className="bg-primary-blue rounded-full w-12 h-12 flex items-center absolute top-3 left-3 cursor-pointer">
                    <ArrowUpLeft className="mx-auto text-white" />
                </div>
            </div>
        </div>
    )
}
