import { Button } from "@components";
import {
  Card as NextUiCard,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import {
  ThumbUp,
  ThumbDown,
  StarIcon,
  Teacher,
  Calender,
  Student,
} from "@assets";

export function CourseCard({ buttonColor = "#1", ongoing = "true" }) {
  const buttonBgClass =
    buttonColor === "#5A7EFF" ? "bg-[#5A7EFF]" : "bg-[#DE59FF]";

  return (
    <NextUiCard className="rounded-3xl bg-[#787878] bg-opacity-[0.13] text-[#272727] shadow-none">
      <CardHeader className="relative h-[225px] overflow-hidden rounded-3xl bg-[#FF9090] p-0">
        <Image
          alt="Card background"
          className="object-cover"
          classNames={{ wrapper: ["w-full h-full"] }}
          width="100%"
          height="100%"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          draggable="false"
        />
        <div className="absolute right-3 top-3 z-10 flex items-center justify-center gap-2">
          <Button className={`${buttonBgClass} text-white`} size="sm">
            طراحی سایت
          </Button>
          <Button className={`${buttonBgClass} text-white`} size="sm">
            پیشرفته
          </Button>
        </div>
        {ongoing && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-xl bg-[#FFD1CB] px-2 py-1 text-xs text-[#FF5454]">
            <div className="h-2 w-2 rounded-full bg-[#FF5454]" />
            <span>در‌حال برگزاری</span>
          </div>
        )}
      </CardHeader>

      <CardBody className="flex flex-col gap-3 text-right text-sm">
        <div className="">
          <h3 className="inline text-xl font-medium">ری‌اکت جی‌اس</h3>
          <span className="relative -top-2 mr-1 text-sm">
            (4
            <StarIcon className="inline" />)
          </span>
        </div>
        <p className="line-clamp-2 text-ellipsis text-right font-light text-[#787878]">
          آموزش صفر تا صد کتابخانه پرطرفدار جی‌اس یعنی ری‌اکت همراه تسک های
          مبسیار لورم بسیبلممنون عالی کتاب خونه
        </p>
        <div className="flex gap-3 font-medium">
          <Teacher className="" />
          <p>محمد‌حسین خلیل‌پور</p>
        </div>
        <div className="flex gap-3 font-medium">
          <Calender />
          <p>
            ۳۰ اردیبهشت ۱۴۰۳{" "}
            <span className="text-sm font-light text-[#787878]">(شروع)</span>
          </p>
        </div>
        <div className="flex gap-3 font-medium">
          <Student />
          <p>۸۰ دانشجو</p>
        </div>
      </CardBody>

      <CardFooter className="mb-2 flex flex-row items-center justify-between gap-2 lg:flex-col lg:items-start xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-1 text-xl">
          <span className="font-medium">1,800,000 </span>
          <span className="text-sm text-[#3772FF]">تومان</span>
        </div>
        <div className="-mb-3 flex gap-3">
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
  );
}
