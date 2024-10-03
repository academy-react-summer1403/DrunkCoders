import { Button } from "../index";
import {
  Card as NextUiCard,
  CardHeader,
  CardBody,
  Image,
} from "@nextui-org/react";
import {
  ThumbUp,
  ThumbDown,
  StarIcon,
  QuillWrite,
  HidePassword,
} from "../../assets/index";

export function NewsCard({ buttonColor = "#5A7EFF" }) {
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
          src="https://nextui.org/images/card-example-2.jpeg"
          draggable="false"
        />
        <div className="absolute right-3 top-3 z-10 flex items-center justify-center gap-2">
          <Button className={`${buttonBgClass} text-white`} size="sm">
            مقاله{" "}
          </Button>
          <Button className={`${buttonBgClass} text-white`} size="sm">
            برنامه نویسی
          </Button>
        </div>
      </CardHeader>

      <CardBody className="flex flex-col gap-3 text-right text-sm">
        <div className="">
          <h3 className="inline text-xl font-medium">
            ری اکت چیست و چرا باید ازش استفاده کنیم؟
          </h3>
          <span className="relative -top-[2px] mr-[2px] text-base">
            (4
            <StarIcon className="inline" />)
          </span>
        </div>
        <p className="line-clamp-4 text-ellipsis text-right font-light text-[#787878]">
          ری اکت (React) یک کتابخانه جاوا اسکریپتی برای ساخت رابط کاربری بوده که
          برای ایجاد برنامه‌های تحت وب با استفاده از کامپوننت‌ها، قابل استفاده
          است.
        </p>
        <div className="flex gap-3 font-medium">
          <QuillWrite className="" />
          <p>سعید قربانی</p>
        </div>
        <div className="flex gap-3 font-medium">
          <HidePassword />
          <p>225</p>
        </div>

        <div className="-mt-2 mb-1 flex flex-row items-center justify-between gap-2 xl:flex-row xl:items-center xl:justify-between">
          <div className="-mb-1 flex gap-3">
            <div className="flex gap-2">
              <ThumbUp className="-mt-1" />
              <span className="">22</span>
            </div>
            <div className="flex gap-2">
              <ThumbDown />2
            </div>
          </div>

          <Button className="px-4 py-[9px] text-base lg:text-sm xl:text-base">
            بیشتر بخوانید
          </Button>
        </div>
      </CardBody>

      {/* <CardFooter >
       
      </CardFooter> */}
    </NextUiCard>
  );
}
