import {
  BookDownload,
  Cancel,
  coursesFallback,
  HidePassword,
} from '@assets/index'
import { PriceAndTomanLabel } from '@components/index'
import { convertGrigorianDateToJalaali, isValidUrl } from '@core/index'
import { Image, Tooltip } from '@nextui-org/react'

export function MyFavCoursesRenderCells({
  item,
  columnKey,
  onOpenSummaryModal,
}) {
  switch (columnKey) {
    case 'tumbImageAddress':
      return (
        <div className="h-16 w-24">
          <Image
            width="100%"
            height="100%"
            alt={item.courseName}
            src={
              isValidUrl(item.tumbImageAddress)
                ? item.tumbImageAddress
                : coursesFallback
            }
            isZoomed
            removeWrapper
            fallbackSrc={coursesFallback}
          />
        </div>
      )
    case 'title':
      return (
        <p className="text-md line-clamp-1 text-ellipsis font-medium lg:text-xl">
          {item.title}
        </p>
      )
    case 'teacherName':
      return <p className={`line-clamp-1 text-ellipsis`}>{item.teacherName}</p>
    case 'startTime':
      return <p>{convertGrigorianDateToJalaali(item.startTime)}</p>
    case 'cost':
      return <PriceAndTomanLabel price1={item.cost} tomanColor size="text-xl" />
    case 'actions':
      return (
        <div className="flexC gap-4 text-basic-gray">
          <Tooltip content="مشاهده">
            <span>
              <HidePassword
                onClick={() => onOpenSummaryModal(item)}
                className="cursor-pointer text-primary-blue transition-all"
              />
            </span>
          </Tooltip>

          <Tooltip content="رزرو">
            <span>
              <BookDownload
                onClick={() => onOpenSummaryModal(item)}
                className="cursor-pointer text-primary-blue transition-all"
              />
            </span>
          </Tooltip>

          <Tooltip content="حذف">
            <span>
              <Cancel
                onClick={() => onOpenSummaryModal(item)}
                className="cursor-pointer text-primary-blue transition-all"
              />
            </span>
          </Tooltip>
        </div>
      )
    default:
      return null
  }
}
