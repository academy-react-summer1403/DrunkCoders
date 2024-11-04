import { coursesFallback, HidePassword, Money } from '@assets/index'
import { PriceAndTomanLabel } from '@components/index'
import { convertGrigorianDateToJalaali, isValidUrl } from '@core/index'
import { Chip, Image, Tooltip } from '@nextui-org/react'

export function MyReservationsRendercell({
  item,
  columnKey,
  onOpenSummaryModal,
}) {
  const cellValue = item[columnKey]

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
    case 'courseName':
      return (
        <p className="text-md line-clamp-1 text-ellipsis font-medium lg:text-xl">
          {item.courseName}
        </p>
      )
    case 'teacherName':
      return <p className={`line-clamp-1 text-ellipsis`}>{item.teacherName}</p>
    case 'lastUpdate':
      return <p>{convertGrigorianDateToJalaali(item.reserverDate)}</p>
    case 'cost':
      return <PriceAndTomanLabel price1={item.cost} tomanColor size="text-xl" />
    case 'accept':
      return (
        <Chip
          color={item.accept ? 'success' : 'danger'}
          size="sm"
          variant="flat"
        >
          <p>{item.accept ? 'تأیید شده' : 'تأیید نشده'}</p>
        </Chip>
      )
    case 'actions':
      return (
        <Tooltip content="مشاهده">
          <span>
            <HidePassword
              onClick={() => onOpenSummaryModal(item)}
              className="cursor-pointer text-primary-blue transition-all"
            />
          </span>
        </Tooltip>
      )
    default:
      return cellValue
  }
}
