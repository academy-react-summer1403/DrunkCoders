import { Calendar2, Calender, HidePassword, Student } from '@assets/index'
import { convertGrigorianDateToJalaali } from '@core/index'

export function DateAndStudentNumber({
  capacity,
  currentRegistrants,
  startDate,
  endDate,
  type,
  views,
}) {
  return (
    <section className="gap -mt-2 flex flex-col gap-4">
      {type !== 'myFavArticles' && (
        <div className="flex gap-3 font-medium">
          <Student />
          <p>{currentRegistrants + ' / ' + capacity} دانشجو</p>
        </div>
      )}

      <div className="flex gap-3 font-medium">
        <Calender />
        <p>
          <span>{convertGrigorianDateToJalaali(startDate)}</span>
          <span className="mr-1 text-sm font-light text-[#787878] dark:text-white/60">
            (شروع)
          </span>
        </p>
      </div>

      {type !== 'myFavArticles' && (
        <div className="flex gap-3 font-medium">
          <Calendar2 />
          <p>
            <span>{convertGrigorianDateToJalaali(endDate)}</span>
            <span className="mr-1 text-sm font-light text-[#787878] dark:text-white/60">
              (پایان)
            </span>
          </p>
        </div>
      )}

      {type === 'myFavArticles' && (
        <div className="flex gap-3 font-medium">
          <HidePassword />
          <p>{views}</p>
        </div>
      )}
    </section>
  )
}
