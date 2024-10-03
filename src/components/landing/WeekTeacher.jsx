import {Button} from '../common/Button'
import {Avatar} from '@nextui-org/react'

export function WeekTeacher() {
    return (
        <div className=" text-center my-20">
            <h2 className="text-[40px] font-medium ">برترین اساتید هفته</h2>
            <p className="text-[#787878] text-xl  mt-3 mb-20 lg:mb-40">
                اساتیدی که با نظر سنجی در دوره ها به آنها بیشترین رای مثبت را دادند
            </p>

            <div className="flex justify-between flex-wrap lg:flex-nowrap gap-y-16 lg:gap-24 xl:gap-36 ">
                {Array.from({length: 3}).map((_, index) => (
                    <div
                        key={index}
                        className={`border-4 flex flex-col gap-6 p-4 text-center rounded-[32px] relative ${
                            index === 1
                                ? 'border-primary-blue lg:scale-[1.20] relative lg:-top-8 order-[-1] lg:order-[0]'
                                : 'sm:order-1 sm:basis-[45%] lg:order-[0] lg:basis-auto'
                        }`}
                    >
                        <div>
                            <h3 className="text-2xl font-medium mt-8">محمد حسین بحرالعلومی</h3>
                            <p className="text-sm text-[#787878] mt-2">دکتری هوش مصنوعی</p>
                        </div>

                        <div>
                            {index === 0 && <span className="text-4xl">4.1 🥈</span>}
                            {index === 1 && <span className="text-4xl">4.2 🥇</span>}
                            {index === 2 && <span className="text-4xl">4.0 🥉</span>}
                        </div>

                        <p className="text-ellipsis leading-5 line-clamp-2 font-light text-xs text-[#787878]">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
                            از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
                            سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
                            متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                            درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با
                            نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
                            خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
                            داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان
                            رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                            پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        </p>

                        <Button className="text-lg font-medium">صفحه استاد</Button>

                        <Avatar
                            className={`absolute top-0 w-16 h-16  right-[50%] translate-x-[50%] translate-y-[-50%] ${
                                index === 1 ? 'border-4 border-primary-blue w-[88px] h-[88px]' : ''
                            }`}
                            src=""
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
