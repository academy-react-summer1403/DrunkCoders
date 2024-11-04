import { coursesFallback } from '@assets/index'
import { convertGrigorianDateToJalaali, isValidUrl } from '@core/index'
import { Chip, Image } from '@nextui-org/react'

export function PicAndDescrption({
  course,
  onOpenSummaryModal,
  myReservation,
}) {
  return (
    <div
      onClick={() => onOpenSummaryModal(course)}
      className="flex cursor-pointer gap-4 rounded-2xl border-b-1 py-4 hover:bg-gray-200 dark:border-gray-800 dark:hover:bg-zinc-900"
    >
      <Image
        height={82}
        width={115}
        src={
          isValidUrl(course.tumbImageAddress)
            ? course.tumbImageAddress
            : coursesFallback
        }
        alt={course.courseTitle}
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-base font-medium">
          {course.courseTitle || course.courseName}
        </h1>
        <p className="text-sm text-basic-gray">
          {course.fullName || course.teacherName}
        </p>
        {myReservation ? (
          <Chip
            color={course.accept ? 'success' : 'danger'}
            size="sm"
            variant="flat"
          >
            <p>{course.accept ? 'تأیید شده' : 'تأیید نشده'}</p>
          </Chip>
        ) : (
          <p className="text-sm text-basic-gray">
            {convertGrigorianDateToJalaali(
              course.lastUpdate || course.reserverDate,
            )}
          </p>
        )}
      </div>
    </div>
  )
}
