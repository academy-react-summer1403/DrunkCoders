import { Cells, Layers, Sorting, Teacher } from '@assets/index'
import {
  IconLabel,
  PriceSlider,
  SearchBox,
  SelectOption,
  JalaliDateRangePicker,
} from '@components/index'
import { useQuery } from '@tanstack/react-query'
import {
  getAllTeachers,
  getCoursesCategory,
  getCoursesLevel,
} from '@core/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { sortFilterActions } from '@store/index'
import { DateObject } from 'react-multi-date-picker'

export function CourseFilter() {
  const { filterId, dateRange, cost, order } = useSelector(
    (state) => state.sort,
  )

  const dispatch = useDispatch()

  let { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCoursesCategory,
  })
  let { data: levels } = useQuery({
    queryKey: ['course-level'],
    queryFn: getCoursesLevel,
  })
  let { data: teachers } = useQuery({
    queryKey: ['teachers'],
    queryFn: getAllTeachers,
  })

  categories = categories?.map((category) => ({
    id: category.id,
    name: category.techName,
  }))
  levels = levels?.map((level) => ({
    id: level.id,
    name: level.levelName,
  }))
  teachers = teachers?.map((teacher) => ({
    id: teacher.teacherId,
    name: teacher.fullName,
  }))

  function handleFilterChange(identifier, id) {
    dispatch(
      sortFilterActions.setFilterId({ filterIdentifier: identifier, id }),
    )
  }
  function handleMoblieOrderChange(_, id) {
    dispatch(sortFilterActions.setOrder(id))
  }

  return (
    <div className="sticky top-0 flex flex-col gap-8 rounded-3xl px-3 py-5 dark:bg-white/20 md:bg-[#E4E4E4]">
      <div className="hidden md:block">
        <SearchBox />
      </div>

      <SelectOption
        identifier="category"
        data={categories}
        label={<IconLabel icon={Cells} label="دسته‌بندی" />}
        onFilterChange={handleFilterChange}
        prevSelectedItem={filterId.category}
      />
      <SelectOption
        identifier="level"
        data={levels}
        label={<IconLabel icon={Layers} label="سطح آموزشی" />}
        onFilterChange={handleFilterChange}
        prevSelectedItem={filterId.level}
      />
      <SelectOption
        identifier="teacher"
        data={teachers}
        label={<IconLabel icon={Teacher} label="اساتید" />}
        onFilterChange={handleFilterChange}
        prevSelectedItem={filterId.teacher}
      />

      <PriceSlider previousValue={[cost.costDown, cost.costUp]} />

      <JalaliDateRangePicker
        prevDate={[
          dateRange.startDate && new DateObject(dateRange.startDate),
          dateRange.endDate && new DateObject(dateRange.endDate),
        ]}
      />

      <div className="block md:hidden">
        <SelectOption
          onFilterChange={handleMoblieOrderChange}
          prevSelectedItem={order}
          data={[
            { id: 'costDesc', name: 'بالاترین قیمت ' },
            { id: 'costAsc', name: 'پایین‌ترین قیمت' },
            { id: 'InsertDate', name: 'جدیدترین' },
          ]}
          label={<IconLabel icon={Sorting} label="ترتیب" />}
        />
      </div>
    </div>
  )
}
