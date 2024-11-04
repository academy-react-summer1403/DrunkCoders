import { CircularProgress } from '@nextui-org/react'

export function CircularProgressAndLabel({
  value,
  classNames,
  label,
  className,
}) {
  return (
    <div className="flexC gap-2">
      <CircularProgress
        label={
          label &&
          (value === 100 ? (
            <span className="text-primary-blue">
              اطلاعات حساب‌ کاربری شما تکمیل است
            </span>
          ) : (
            'اطلاعات حساب‌ کاربری شما تکمیل نیست'
          ))
        }
        size="lg"
        value={value}
        className={className}
        showValueLabel={true}
        classNames={{
          ...classNames,
          svg: `${value === 100 ? 'text-primary-blue' : 'text-[#FFC619]'} ${classNames?.svg}`,
          value: `text-xl font-thin ${value === 100 ? 'text-primary-blue' : 'text-[#FFC619]'} ${classNames?.value}`,
        }}
      />

      {!label && <p className="font-medium">پرداخت شده</p>}
    </div>
  )
}
