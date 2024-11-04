import { pirceFormatter } from '@core/index'

export function PriceAndTomanLabel({
  price1,
  price2,
  className,
  tomanColor,
  size,
}) {
  return (
    <div
      className={`flex items-center gap-1 ${price2 ? 'text-[28px]' : 'text-2xl'} ${className}`}
    >
      {price2 && (
        <span className="ml-1">
          {pirceFormatter(price2)}
          {' /'}
        </span>
      )}
      <span className={`${size}`}>{pirceFormatter(price1) ?? '1,880,000'}</span>
      <span
        className={`-mb-2 text-sm ${tomanColor ? 'text-primary-blue' : ''}`}
      >
        تومان
      </span>
    </div>
  )
}
