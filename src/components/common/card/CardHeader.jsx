import { articleFallback, coursesFallback } from '@assets/index'
import { Button } from '@components/index'
import { isValidUrl } from '@core/index'
import { Image } from '@nextui-org/react'

export function CardHeader({ data, buttonColor, type, view }) {
  const buttonBgClass =
    buttonColor === '#5A7EFF' ? 'bg-[#5A7EFF]' : 'bg-[#DE59FF]'

  return (
    <>
      {data && (
        <div className={`relative h-full w-full`}>
          <Image
            alt="Card background"
            className="object-cover p-0"
            classNames={{
              wrapper: ['w-full h-full p-0'],
            }}
            width="100%"
            height="100%"
            src={
              type === 'course'
                ? isValidUrl(data.tumbImageAddress)
                  ? data.tumbImageAddress
                  : coursesFallback
                : isValidUrl(data.currentImageAddressTumb)
                  ? data.currentImageAddressTumb
                  : articleFallback
            }
            draggable="false"
          />

          <div className="absolute right-3 top-3 z-10 flex items-center justify-center gap-2">
            <Button className={`${buttonBgClass} text-white`} size="sm">
              {type === 'course'
                ? data.typeName || data.technologyList
                : 'مقاله'}
            </Button>
            <Button
              className={`${buttonBgClass} max-w-32 text-white`}
              size="sm"
            >
              {type === 'course' ? data.levelName : data.newsCatregoryName}
            </Button>
          </div>

          {type === 'course' && data.statusName && (
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-xl bg-[#FFD1CB] px-2 py-1 text-xs text-[#FF5454]">
              <div className="h-2 w-2 rounded-full bg-[#FF5454]" />
              <span>{data.statusName}</span>
            </div>
          )}
        </div>
      )}
    </>
  )
}
