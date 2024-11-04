import {
  Calendar2,
  Cells,
  Layers,
  Search,
  Sorting,
  Teacher,
} from '@assets/index'
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

  function handleSearch(searchTerm) {
    dispatch(
      sortFilterActions.setSearchTerm(
        searchTerm.trim() === '' ? null : searchTerm.trim(),
      ),
    )
  }

  function handleDateChange(startDate, endDate) {
    dispatch(sortFilterActions.setDateRange({ startDate, endDate }))
  }

  function handleClearCalender() {
    dispatch(sortFilterActions.setDateRange({ startDate: null, endDate: null }))
  }

  function handlePriceChange(costUp, costDown) {
    dispatch(sortFilterActions.setCost({ costDown, costUp }))
  }

  function handleClearPrice() {
    dispatch(sortFilterActions.setCost({ costDown: null, costUp: null }))
  }

  return (
    <div className="flex h-fit flex-col gap-8 rounded-3xl px-3 py-5 dark:bg-white/20 md:bg-[#E4E4E4]">
      <div className="hidden md:block">
        <SearchBox
          onSearch={handleSearch}
          label={<IconLabel icon={Search} label="جست‌ جو دوره" />}
        />
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

      <PriceSlider
        previousValue={[cost.costDown, cost.costUp]}
        onChange={handlePriceChange}
        onClear={handleClearPrice}
      />

      <JalaliDateRangePicker
        label={<IconLabel icon={Calendar2} label="تاریخ برگزاری" />}
        onChange={handleDateChange}
        onClear={handleClearCalender}
        prevDate={[
          dateRange.startDate && new DateObject(dateRange.startDate),
          dateRange.endDate && new DateObject(dateRange.endDate),
        ]}
        placement="up"
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
