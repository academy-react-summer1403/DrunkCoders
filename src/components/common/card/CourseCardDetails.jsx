import { Calender, StarIcon, Student, Teacher } from '@assets/index'
import { convertGrigorianDateToJalaali } from '@core/index'

export function CourseCardDetails({ course }) {
  const persianDate = convertGrigorianDateToJalaali(course?.lastUpdate)

  return (
    <>
      {course && (
        <div className="flex flex-col gap-3 text-right text-sm dark:text-white">
          <div className="line-clamp-1 text-ellipsis">
            <h3 className="inline text-2xl font-medium">
              {course.title || 'رابط کاربری و تجربه کابری'}
            </h3>
            <span className="relative -top-3 mr-1 text-sm">
              ({course.courseRate}
              <StarIcon className="-mt-1 mr-[3px] inline" />)
            </span>
          </div>

          <p className="line-clamp-2 h-10 text-ellipsis text-right text-[#787878] dark:text-white/60">
            {course.describe ||
              'آموزش صفر تا صد کتابخانه پرطرفدار جی‌اس یعنی ری‌اکت همراه تسک های مفید برای یادگیری بهتر'}
          </p>

          <div className="flex gap-3 font-medium">
            <Teacher className="" />
            <p>{course.teacherName}</p>
          </div>

          <div className="flex gap-3 font-medium">
            <Calender />
            <p>
              <span>{persianDate}</span>
              <span className="mr-1 text-sm font-light text-[#787878] dark:text-white/60">
                (شروع)
              </span>
            </p>
          </div>

          <div className="flex gap-3 font-medium">
            <Student />
            <p>
              {course.currentRegistrants || (Math.random() * 100).toFixed(0)}{' '}
              دانشجو
            </p>
          </div>
        </div>
      )}
    </>
  )
}
