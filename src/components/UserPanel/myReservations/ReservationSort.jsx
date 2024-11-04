import { Cancel2 } from '@assets/index'
import { Divider } from '@nextui-org/react'
import { Button } from '@components/index'

export function ReservationSort({ onSort, sort }) {
  return (
    <div className="mb-5 flex items-center self-start lg:-mb-4 lg:self-center">
      <p className="ml-3 text-lg font-medium text-[#787878]">ترتیب</p>

      <div className="flex items-center gap-2">
        <ButtonComp1
          identifier={true}
          className={`bg-[#17c964]/20 text-success ${sort === true ? 'border-2 border-primary-blue' : ''}`}
        >
          تایید شده
        </ButtonComp1>
        <ButtonComp1
          identifier={false}
          className={`bg-[#f31260]/20 text-danger ${sort === false ? 'border-2 border-primary-blue' : ''}`}
        >
          تایید نشده
        </ButtonComp1>

        <Divider
          orientation="vertical"
          className="mx-2 h-[22px] dark:bg-white"
        />

        <Button
          onClick={() => onSort(null)}
          variant="bordered"
          startContent={<Cancel2 />}
          className="border border-[#FF5454] bg-transparent text-[#FF5454] hover:border-red-600"
        >
          حذف
        </Button>
      </div>
    </div>
  )

  function ButtonComp1({ identifier, children, className }) {
    return (
      <Button
        onClick={() => onSort(identifier)}
        className={`border-2 border-transparent ${className}`}
      >
        {children}
      </Button>
    )
  }
}
