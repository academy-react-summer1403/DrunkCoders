import { Cells, Layers, Sorting, Teacher } from '@assets/index'
import {
  IconLabel,
  PriceSlider,
  SearchBox,
  SelectOption,
} from '@components/index'
// import { JalaliDateRangePicker } from './JalaliDateRangePicker.jsx'

export function CourseFilter() {
  return (
    <div className="sticky top-0 flex flex-col gap-8 rounded-3xl px-3 py-5 dark:bg-white/20 md:bg-[#E4E4E4]">
      <div className="hidden md:block">
        <SearchBox />
      </div>

      <SelectOption label={<IconLabel icon={Cells} label="دسته‌بندی" />} />
      <SelectOption label={<IconLabel icon={Layers} label="سطح آموزشی" />} />
      <SelectOption label={<IconLabel icon={Teacher} label="اساتید" />} />

      <PriceSlider />

      {/* <JalaliDateRangePicker /> */}

      <div className="block md:hidden">
        <SelectOption label={<IconLabel icon={Sorting} label="ترتیب" />} />
      </div>
    </div>
  )
}
