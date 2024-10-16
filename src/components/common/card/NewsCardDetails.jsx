import { Calender, HidePassword, QuillWrite, StarIcon } from '@assets/index'
import { convertGrigorianDateToJalaali } from '@core/index'

export function NewsCardDetails({ news, view }) {
  const persianDate = convertGrigorianDateToJalaali(news.insertDate)
  return (
    <div className="flex flex-col gap-4 text-right text-sm dark:text-white">
      <div
        className={`line-clamp-2 h-14 text-ellipsis ${view === 'list' ? 'lg:line-clamp-1 lg:h-7' : ''} `}
      >
        <h3 className="inline text-xl font-medium dark:text-white">
          {news.title}
        </h3>
        <span className="relative -top-[6px] mr-[2px] text-sm">
          ({news.currentRate}
          <StarIcon className="-mt-1 mr-[2px] inline" />)
        </span>
      </div>

      <p
        className={`line-clamp-4 h-20 text-ellipsis text-right font-light text-[#787878] dark:text-white/60 ${view === 'list' ? 'lg:line-clamp-2 lg:h-10' : ''}`}
      >
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

      <div className="flex items-center gap-3 font-medium">
        <Calender />
        <p>{persianDate}</p>
      </div>
    </div>
  )
}
