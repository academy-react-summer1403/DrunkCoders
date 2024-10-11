import { HidePassword, QuillWrite, StarIcon } from '@assets/index'

export function NewsCardDetails({ news }) {
  return (
    <div className="flex flex-col gap-3 text-right text-sm dark:text-white">
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
    </div>
  )
}
