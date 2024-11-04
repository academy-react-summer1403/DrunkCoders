import { articleFallback, Cancel, HidePassword } from '@assets/index'

import { convertGrigorianDateToJalaali, isValidUrl } from '@core/index'
import { Image, Tooltip } from '@nextui-org/react'

export function MyFavArticlesRenderCells({
  item,
  columnKey,
  onOpenSummaryModal,
}) {
  //   console.log(data)
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
                : articleFallback
            }
            isZoomed
            removeWrapper
            fallbackSrc={articleFallback}
          />
        </div>
      )
    case 'title':
      return (
        <p className="text-md line-clamp-1 text-ellipsis font-medium lg:text-xl">
          {item.title}
        </p>
      )
    case 'about':
      return <p className={`line-clamp-1 text-ellipsis`}>{item.miniDescribe}</p>
    case 'insertDate':
      return <p>{convertGrigorianDateToJalaali(item.insertDate)}</p>
    case 'userName':
      return <p>{item.addUserFullName}</p>
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
