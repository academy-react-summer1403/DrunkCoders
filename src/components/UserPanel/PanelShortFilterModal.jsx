import { Calendar2, Search, Sorting } from '@assets/index'
import {
  IconLabel,
  JalaliDateRangePicker,
  SearchBox,
  SelectOption,
} from '@components/index'
import { DateObject } from 'react-multi-date-picker'

export function PanelShortFilterModal({
  handleSearch,
  onDateChange,
  onClearCalender,
  dateRange,
  prevSearchTerm,
  relative,
  sort,
  onSort,
}) {
  function handleSort(_, value) {
    onSort(value === 'accept' ? true : value === 'notAccept' ? false : null)
  }

  return (
    <div className="mb-3 flex flex-col items-center gap-6 sm:flex-row">
      {onSort && (
        <div className="w-full">
          <SelectOption
            onFilterChange={handleSort}
            prevSelectedItem={
              sort === true ? 'accept' : sort === false ? 'notAccept' : null
            }
            data={[
              { id: 'accept', name: 'تایید شده' },
              { id: 'notAccept', name: 'تایید نشده' },
            ]}
            label={<IconLabel icon={Sorting} label="ترتیب" />}
          />
        </div>
      )}

      <SearchBox
        onSearch={handleSearch}
        label={<IconLabel icon={Search} label="جست‌جو دوره" />}
        placeholder="جستجوی دوره"
        className="sm:w-[290px]"
        prevSearchTerm={prevSearchTerm}
      />

      <div className="w-full sm:w-72">
        <JalaliDateRangePicker
          label={<IconLabel icon={Calendar2} label="تاریخ انتشار" />}
          onChange={onDateChange}
          onClear={onClearCalender}
          prevDate={[
            dateRange?.startDate && new DateObject(dateRange.startDate),
            dateRange?.endDate && new DateObject(dateRange.endDate),
          ]}
          relative={relative}
        />
      </div>
    </div>
  )
}
