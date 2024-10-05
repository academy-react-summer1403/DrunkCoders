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
import { useState } from "react";
import { pirceFormatter } from "@core";

export function CourseCard({ buttonColor, data: course }) {
  const [likeState, setLikeState] = useState({ like: false, dislike: false });

  function handleLike(identifier) {
    setLikeState((prevState) =>
      identifier === "like"
        ? { like: !prevState.like, dislike: false }
        : { dislike: !prevState.dislike, like: false },
    );
  }

  const buttonBgClass =
    buttonColor === "#5A7EFF" ? "bg-[#5A7EFF]" : "bg-[#DE59FF]";

  return (
    <NextUiCard className="rounded-3xl bg-[#787878] bg-opacity-[0.13] text-[#272727] shadow-none dark:bg-white/20">
      <CardHeader className="relative h-[225px] overflow-hidden rounded-3xl bg-[#FF9090] p-0">
        <Image
          alt="Card background"
          className="object-cover p-0"
          classNames={{ wrapper: ["w-full h-full p-0"] }}
          width="100%"
          height="100%"
          src={course.tumbImageAddress}
          // src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
          draggable="false"
        />
        <div className="absolute right-3 top-3 z-10 flex items-center justify-center gap-2">
          <Button className={`${buttonBgClass} text-white`} size="sm">
            {course.typeName}
          </Button>
          <Button className={`${buttonBgClass} text-white`} size="sm">
            {course.levelName}
          </Button>
        </div>
        {course.statusName && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-xl bg-[#FFD1CB] px-2 py-1 text-xs text-[#FF5454]">
            <div className="h-2 w-2 rounded-full bg-[#FF5454]" />
            <span>{course.statusName}</span>
          </div>
        )}
      </CardHeader>

      <CardBody className="flex flex-col gap-3 text-right text-sm dark:text-white">
        <div className="line-clamp-1 text-ellipsis">
          <h3 className="inline text-xl font-medium">{course.title}</h3>
          <span className="relative -top-2 mr-1 text-sm">
            ({course.courseRate}
            <StarIcon className="inline" />)
          </span>
        </div>

        <p className="line-clamp-2 h-10 text-ellipsis text-right font-light text-[#787878] dark:text-white/60">
          {course.describe}
        </p>

        <div className="flex gap-3 font-medium">
          <Teacher className="" />
          <p>{course.teacherName}</p>
        </div>

        <div className="flex gap-3 font-medium">
          <Calender />
          <p>
            ۳۰ اردیبهشت ۱۴۰۳{" "}
            <span className="text-sm font-light text-[#787878] dark:text-white/60">
              (شروع)
            </span>
          </p>
        </div>

        <div className="flex gap-3 font-medium">
          <Student />
          <p>۸۰ دانشجو</p>
        </div>
      </CardBody>

      <CardFooter className="mb-2 flex flex-row items-center justify-between gap-2 dark:text-white lg:flex-col lg:items-start xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-1 text-xl">
          <span className="font-medium">{pirceFormatter(course.cost)} </span>
          <span className="text-sm text-[#3772FF]">تومان</span>
        </div>
        <div className="-mb-3 flex gap-3">
          <div className="flex gap-2">
            <ThumbUp
              onClick={() => handleLike("like")}
              className={`-mt-1 cursor-pointer stroke-black hover:text-primary-blue dark:stroke-white ${likeState.like ? "text-primary-blue" : "text-transparent"} `}
            />
            <span className="">{course.likeCount}</span>
          </div>
          <div className="flex gap-2">
            <ThumbDown
              onClick={() => handleLike("dislike")}
              className={`cursor-pointer stroke-black hover:text-primary-blue dark:stroke-white ${likeState.dislike ? "text-primary-blue" : "text-transparent"} `}
            />
            {course.dissLikeCount}
          </div>
        </div>
      </CardFooter>
    </NextUiCard>
  );
}
