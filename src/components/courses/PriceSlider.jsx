import { pirceFormatter } from '@core/index'
import { Slider } from '@nextui-org/react'
import { IconLabel } from '@components/index'
import { Money } from '@assets/index'
import { useState } from 'react'

export function PriceSlider() {
  const [value, setValue] = useState([100000, 500000])
  return (
    <Slider
      label={<IconLabel icon={Money} label="قیمت" />}
      step={5000}
      minValue={0}
      maxValue={2000000}
      //defaultValue={[100000, 500000]}
      value={value}
      onChange={setValue}
      getValue={(price) => {
        return (
          <div>
            <span className="text-basic-gray dark:text-white/60">از </span>
            {pirceFormatter(price[0])}
            <span className="mr-8">
              <span className="text-basic-gray dark:text-white/60">تا </span>
              {pirceFormatter(price[1])}
            </span>
          </div>
        )
      }}
      className="max-w-md"
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
  )
}
