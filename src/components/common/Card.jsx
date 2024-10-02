import {Button} from '../index'
import {Card as NextUiCard, CardHeader, CardBody, CardFooter, Image} from '@nextui-org/react'
import ThumbUp from '../../assets/icons/thumbs-up.svg?react'
import ThumbDown from '../../assets/icons/thumbs-down.svg?react'
import StartIcon from '../../assets/icons/star.svg?react'
import Teacher from '../../assets/icons/teacher.svg?react'
import Calender from '../../assets/icons/calendar.svg?react'
import Student from '../../assets/icons/students.svg?react'

export function Card({buttonColor = '#1', ongoing = 'true'}) {
    const buttonBgClass = buttonColor === '#5A7EFF' ? 'bg-[#5A7EFF]' : 'bg-[#DE59FF]'

    return (
        <NextUiCard className="ww-[315px] shadow-none hh-[529px] bg-[#787878] bg-opacity-[0.13]  text-[#272727] mt-10 rounded-3xl">
            <CardHeader className=" relative bg-[#FF9090] h-[225px] p-0 rounded-3xl overflow-hidden">
                <Image
                    alt="Card background"
                    className="object-cover"
                    classNames={{wrapper: ['w-full h-full']}}
                    width="100%"
                    height="100%"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
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

            <CardBody className="flex flex-col gap-3 text-sm text-right">
                <div className="">
                    <h3 className="text-xl font-medium inline">ری‌اکت جی‌اس</h3>
                    <span className="text-sm mr-1 relative -top-2">
                        (4
                        <StartIcon className="inline" />)
                    </span>
                </div>
                <p className="text-ellipsis line-clamp-2  font-light text-right text-[#787878]">
                    آموزش صفر تا صد کتابخانه پرطرفدار جی‌اس یعنی ری‌اکت همراه تسک های مبسیار لورم
                    بسیبلممنون عالی کتاب خونه
                </p>
                <div className="flex gap-3 font-medium">
                    <Teacher className="" />
                    <p>محمد‌حسین خلیل‌پور</p>
                </div>
                <div className="flex gap-3 font-medium">
                    <Calender />
                    <p>
                        ۳۰ اردیبهشت ۱۴۰۳{' '}
                        <span className="text-[#787878] text-sm font-light">(شروع)</span>
                    </p>
                </div>
                <div className="flex gap-3 font-medium">
                    <Student />
                    <p>۸۰ دانشجو</p>
                </div>
            </CardBody>

            <CardFooter className="flex flex-row lg:flex-col xl:flex-row items-center lg:items-start xl:items-center justify-between xl:justify-between mb-2 gap-2">
                <div className="text-xl flex items-center gap-1">
                    <span className="font-medium">1,800,000 </span>
                    <span className="text-sm text-[#3772FF]">تومان</span>
                </div>
                <div className="flex gap-3 -mb-3">
                    <div className="flex gap-2">
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
