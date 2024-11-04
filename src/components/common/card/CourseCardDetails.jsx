import { Calender, StarIcon, Student, Teacher } from '@assets/index'
import { TitleAndStarIcon } from '@components/index'
import { convertGrigorianDateToJalaali } from '@core/index'

export function CourseCardDetails({ course }) {
  return (
    <>
      {course && (
        <div className="flex flex-col gap-3 text-right text-sm dark:text-white">
          <TitleAndStarIcon title={course.title} rate={course.courseRate} />

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
              <span>{convertGrigorianDateToJalaali(course.lastUpdate)}</span>
              <span className="mr-1 text-sm font-light text-[#787878] dark:text-white/60">
                (شروع)
              </span>
            </p>
          </div>

          <div className="flex gap-3 font-medium">
            <Student />
            <p>{course.currentRegistrants || 22} دانشجو</p>
          </div>
        </div>
      )}
    </>
  )
}
