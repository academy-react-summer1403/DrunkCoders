import { StarIcon } from '@assets/index'

export function TitleAndStarIcon({ title, rate }) {
  return (
    <div className="line-clamp-1 text-ellipsis">
      <h3 className="inline text-2xl font-medium">
        {title || 'رابط کاربری و تجربه کابری'}
      </h3>
      <span className="relative -top-3 mr-1 text-sm">
        ({rate}
        <StarIcon className="-mt-1 mr-[3px] inline" />)
      </span>
    </div>
  )
}
