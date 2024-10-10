import { Calendar2, Cells, Layers, Search, Teacher } from '@assets/index'
import {
  BaseInput,
  IconLabel,
  PriceSlider,
  SelectOption,
} from '@components/index'
//import { JalaliDateRangePicker } from './JalaliDateRangePicker.jsx'

export function CourseFilter() {
  return (
    <div className="sticky top-0 flex flex-col gap-8 rounded-3xl bg-[#E4E4E4] px-3 py-5 dark:bg-white/20">
      <BaseInput
        label={<IconLabel icon={Search} label="جست‌ جو دوره" />}
        placeholder="جست جو کنید ..."
        name="search"
        size="lg"
        type="text"
        endIcon={BlueSearchIcon}
        className="mb-0"
        classNames={{ input: 'text-sm' }}
      />

      <SelectOption label={<IconLabel icon={Cells} label="دسته‌بندی" />} />
      <SelectOption label={<IconLabel icon={Layers} label="سطح آموزشی" />} />
      <SelectOption label={<IconLabel icon={Teacher} label="اساتید" />} />

      <PriceSlider />

      <div className="ltr text-center">{/* <JalaliDateRangePicker /> */}</div>
    </div>
  )

  function BlueSearchIcon() {
    return (
      <div className="relative -left-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue">
        <Search className="text-white" />
      </div>
    )
  }
}
