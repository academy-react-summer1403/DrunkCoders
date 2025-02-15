import { pirceFormatter } from '@core/index'
import { Slider } from '@nextui-org/react'
import { IconLabel } from '@components/index'
import { Cancel, Money } from '@assets/index'
import { useEffect, useRef, useState } from 'react'

export function PriceSlider({ previousValue, onClear, onChange }) {
  const [value, setValue] = useState([10 * 1000, 1000 * 1000])
  const timeout = useRef(null)

  useEffect(() => {
    if (previousValue[0]) setValue(previousValue)
  }, [])

  function handleChange(e) {
    setValue(e)
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      onChange(e[1].toString(), e[0].toString())
      timeout.current = null
    }, 1000)
  }

  function clearPrice() {
    setValue([10 * 1000, 1000 * 1000])
    onClear()
  }

  return (
    <div className="flex">
      <Slider
        label={<IconLabel icon={Money} label="قیمت" className="mb-3" />}
        step={5000}
        minValue={10 * 1000}
        maxValue={10 * 1000 * 1000}
        //defaultValue={[100000, 500000]}
        value={value}
        onChange={handleChange}
        getValue={(price) => {
          return (
            <div>
              <span className="text-basic-gray dark:text-white/60">از </span>
              {pirceFormatter(price[0])}
              <span className="mr-6">
                <span className="text-basic-gray dark:text-white/60">تا </span>
                {pirceFormatter(price[1])}
              </span>
            </div>
          )
        }}
        classNames={{
          track: 'bg-basic-gray bg-opacity-20',
          filler: ['bg-transparent'],
        }}
        renderThumb={(props) => (
          <div
            {...props}
            className="group top-1/2 cursor-grab rounded-full data-[dragging=true]:cursor-grabbing"
          >
            <span className="block h-4 w-4 rounded-full bg-primary-blue shadow-small transition-transform group-data-[dragging=true]:scale-80" />
          </div>
        )}
      />
      <div
        onClick={clearPrice}
        className="relative -left-2 flex items-center justify-center"
      >
        <Cancel className="relative -bottom-[19px] h-5 w-5 cursor-pointer transition-all hover:scale-125" />
      </div>
    </div>
  )
}
