import {Button} from '../index'
import {Card as NextUiCard, CardHeader, CardBody, CardFooter, Image} from '@nextui-org/react'
import ThumbUp from '../../assets/icons/thumbs-up-stroke-rounded.svg?react'
import ThumbDown from '../../assets/icons/thumbs-down-stroke-rounded 2.svg?react'
import StartIcon from '../../assets/icons/star.svg?react'
import Teacher from '../../assets/icons/teacher-stroke-rounded 1.svg?react'
import Calender from '../../assets/icons/calendar-03-stroke-rounded 1@2x.svg?react'
import Student from '../../assets/icons/students-stroke-rounded 1.svg?react'

export function Card({buttonColor = '#1', ongoing = 'true'}) {
    const buttonBgClass = buttonColor === '#5A7EFF' ? 'bg-[#5A7EFF]' : 'bg-[#DE59FF]'

    return (
        <NextUiCard className="w-[315px] bg-[#787878] bg-opacity-15 text-[#272727]  h-[529px] mx-auto mt-10 rounded-3xl [direction:rtl]">
            <CardHeader className=" relative bg-[#FF9090] h-[225px] p-0 -mt-1 rounded-3xl">
                <Image
                    alt="Card background"
                    className=" object-cover w-full h-full m-0 rounded-3xl"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                    height={225}
                    draggable="false"
                />
                <div className="flex items-center justify-center gap-2 absolute top-3 right-3 z-10 ">
                    <Button className={`${buttonBgClass} text-white`} size="sm">
                        طراحی سایت
                    </Button>
                    <Button className={`${buttonBgClass}  text-white `} size="sm">
                        پیشرفته
                    </Button>
                </div>
                {ongoing && (
                    <div className="flex items-center gap-2 absolute bottom-3 right-3 z-10 bg-[#FFD1CB] rounded-xl text-[#FF5454] text-xs px-2 py-1">
                        <div className="w-2 h-2 rounded-full bg-[#FF5454]" />
                        <span>در‌حال برگزاری</span>
                    </div>
                )}
            </CardHeader>

            <CardBody className="flex flex-col gap-5 text-sm">
                <div className="flex gap-[2px]">
                    <h3 className=" text-xl font-medium"> ری‌اکت جی‌اس </h3>
                    <div className="flex text-[12px]">
                        <span>(4</span>
                        <StartIcon />)
                    </div>
                </div>
                <p className="text-ellipsis line-clamp-2  font-light text-[#787878] text-right">
                    آموزش صفر تا صد کتابخانه پرطرفدار جی‌اس یعنی ری‌اکت همراه تسک های مبسیار لورم
                    بسیبلممنون عالی کتاب خونه
                </p>
                <div className="flex gap-5 font-medium">
                    <Teacher />
                    <p>محمد‌حسین خلیل‌پور</p>
                </div>
                <div className="flex gap-5 font-medium">
                    <Calender />
                    <p>
                        ۳۰ اردیبهشت ۱۴۰۳{' '}
                        <span className="text-[#787878] text-sm font-light">(شروع)</span>
                    </p>
                </div>
                <div className="flex gap-5 font-medium">
                    <Student />
                    <p>۸۰ دانشجو</p>
                </div>
            </CardBody>

            <CardFooter className="flex justify-between mb-2">
                <div className="text-xl ">
                    <span className="font-medium">1,800,000 </span>
                    <span className="text-sm text-[#3772FF]">تومان</span>
                </div>
                <div className="flex gap-5 -mb-3">
                    <div className="flex gap-2  ">
                        <ThumbUp className="-mt-1" />
                        <span className="">22</span>
                    </div>
                    <div className="flex gap-2">
                        <ThumbDown />2
                    </div>
                </div>
            </CardFooter>
        </NextUiCard>
    )
}
