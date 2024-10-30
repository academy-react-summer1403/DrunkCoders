import { Calendar2, Cells, Search, Sorting } from '@assets/index'
import {
  IconLabel,
  SearchBox,
  SelectOption,
  JalaliDateRangePicker,
} from '@components/index'
import { useQuery } from '@tanstack/react-query'
import { getNewsCategories } from '@core/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { articleSortFilterActions } from '@store/index'
import { DateObject } from 'react-multi-date-picker'

export function ArticleFilter() {
  const dispatch = useDispatch()
  const { category, dateRange, order } = useSelector(
    (state) => state.articleSort,
  )

  let { data: categories } = useQuery({
    queryKey: ['news-categories'],
    queryFn: getNewsCategories,
  })

  categories = categories?.map((category) => ({
    id: category.id,
    name: category.categoryName,
  }))

  function handleFilterChange(_, id) {
    dispatch(articleSortFilterActions.setFilterId(id))
  }
  function handleMoblieOrderChange(_, id) {
    dispatch(articleSortFilterActions.setOrder(id))
  }

  function handleSearch(searchTerm) {
    dispatch(
      articleSortFilterActions.setSearchTerm(
        searchTerm.trim() === '' ? null : searchTerm.trim(),
      ),
    )
  }

  function handleDateChange(startDate, endDate) {
    dispatch(articleSortFilterActions.setDateRange({ startDate, endDate }))
  }

  function handleClearCalender() {
    dispatch(
      articleSortFilterActions.setDateRange({ startDate: null, endDate: null }),
    )
  }

  return (
    <div className="sticky top-28 flex flex-col gap-8 rounded-3xl px-3 py-5 dark:bg-white/20 md:bg-[#E4E4E4]">
      <div className="hidden md:block">
        <SearchBox
          onSearch={handleSearch}
          label={<IconLabel icon={Search} label="جست‌جو اخبار و مقالات" />}
        />
      </div>

      <SelectOption
        identifier="category"
        data={categories}
        label={<IconLabel icon={Cells} label="دسته‌بندی" />}
        onFilterChange={handleFilterChange}
        prevSelectedItem={category}
      />

      <JalaliDateRangePicker
        label={<IconLabel icon={Calendar2} label="تاریخ انتشار " />}
        prevDate={[
          dateRange.startDate && new DateObject(dateRange.startDate),
          dateRange.endDate && new DateObject(dateRange.endDate),
        ]}
        onChange={handleDateChange}
        onClear={handleClearCalender}
      />

      <div className="block md:hidden">
        <SelectOption
          onFilterChange={handleMoblieOrderChange}
          prevSelectedItem={order}
          data={[
            { id: 'insertDate', name: 'جدیدترین' },
            { id: 'currentView', name: 'بیشترین بازدید' },
            { id: 'currentRate', name: 'بیشترین امتیاز' },
          ]}
          label={<IconLabel icon={Sorting} label="ترتیب" />}
        />
      </div>
    </div>
  )
}
