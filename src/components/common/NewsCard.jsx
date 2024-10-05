import { Button } from "@components";
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
} from "@assets";
import { useState } from "react";

export function NewsCard({ buttonColor = "#5A7EFF", data: news }) {
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
          className="object-cover"
          classNames={{ wrapper: ["w-full h-full"] }}
          width="100%"
          height="100%"
          src={news.currentImageAddressTumb}
          draggable="false"
        />
        <div className="absolute right-3 top-3 z-10 flex items-center justify-center gap-2">
          <Button className={`${buttonBgClass} text-white`} size="sm">
            مقاله
          </Button>
          <Button className={`${buttonBgClass} text-white`} size="sm">
            {news.newsCatregoryName}
          </Button>
        </div>
      </CardHeader>

      <CardBody className="flex flex-col gap-3 text-right text-sm dark:text-white">
        <div className="line-clamp-2 h-14 text-ellipsis">
          <h3 className="inline text-xl font-medium dark:text-white">
            {news.title}
          </h3>
          <span className="relative -top-[2px] mr-[2px] text-base">
            ({news.currentRate}
            <StarIcon className="inline" />)
          </span>
        </div>
        <p className="line-clamp-4 h-20 text-ellipsis text-right font-light text-[#787878] dark:text-white/60">
          {news.miniDescribe}
        </p>

        <div className="flex gap-3 font-medium">
          <QuillWrite className="" />
          <p>{news.addUserFullName}</p>
        </div>
        <div className="flex items-center gap-3 font-medium">
          <HidePassword />
          <p>{news.currentView}</p>
        </div>

        <div className="-mt-2 mb-1 flex flex-row items-center justify-between gap-2 xl:flex-row xl:items-center xl:justify-between">
          <div className="-mb-1 flex gap-3">
            <div className="flex gap-2">
              <ThumbUp
                onClick={() => handleLike("like")}
                className={`-mt-1 cursor-pointer stroke-black hover:text-primary-blue ${likeState.like ? "text-primary-blue" : "text-transparent"} `}
              />
              <span className="">{news.currentLikeCount}</span>
            </div>
            <div className="flex gap-2">
              <ThumbDown
                onClick={() => handleLike("dislike")}
                className={`cursor-pointer stroke-black hover:text-primary-blue ${likeState.dislike ? "text-primary-blue" : "text-transparent"} `}
              />
              {news.currentDissLikeCount}
            </div>
          </div>

          <Button className="px-4 py-[9px] text-base lg:text-sm xl:text-base">
            بیشتر بخوانید
          </Button>
        </div>
      </CardBody>
    </NextUiCard>
  );
}
