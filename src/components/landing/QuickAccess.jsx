import PanelImg from '../../assets/icons/landing-panel.svg?react'
import panelImg from '../../assets/images/landing-panel.png'

export function QuickAccess() {
    return (
        <div className="flex  gap-4 w-full ">
            <div className=" basis-[44.44%]  h-[332px] border-4 p-4 rounded-[32px] relative overflow-hidden">
                <h2 className="text-3xl font-medium mb-4">پنل اختصاصی دانشجو</h2>
                <p className="text-base">
                    پنل های اختصاصی دانشجو <br /> برای مدیریت دوره ها وتمرین ها
                </p>

                <div className="absolute bottom-0 left-0 w-[450px] hh-[60%]">
                    {/* <PanelImg /> */}
                    <img src={panelImg} className=" object-cover  w-full h-full" />
                </div>
            </div>

            <div className="basis-[33.33%] h-[332px] border-4 p-3 rounded-[32px] ">
                <h2>پنل اختصاصی دانشجو</h2>
                <p>
                    پنل های اختصاصی دانشجو <br /> برای مدیریت دوره ها وتمرین ها
                </p>
            </div>

            <div className="basis-[22.22%] h-[332px] border-4 p-3 rounded-[32px] ">
                <h2>پنل اختصاصی دانشجو</h2>
                <p>
                    پنل های اختصاصی دانشجو <br /> برای مدیریت دوره ها وتمرین ها
                </p>
            </div>
        </div>
    )
}
