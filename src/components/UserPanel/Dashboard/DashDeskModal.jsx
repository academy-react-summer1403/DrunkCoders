import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import React from 'react'
import { DashTable } from './DashTable'
import {
  Button,
  IconLabel,
  JalaliDateRangePicker,
  ModalCloseBtn,
  Pagination,
  PriceSlider,
  SearchBox,
  SelectOption,
} from '@components/index'
import { Calendar2, Search, Teacher } from '@assets/index'
import { dashSortFilterActions } from '@store/dashPanel-filter'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getAllTeachers } from '@core/index'
import { DateObject } from 'react-multi-date-picker'

export function DashDeskModal({ isOpen, onClose }) {
  const dispatch = useDispatch()
  const { TeacherId, Query, StartDate, EndDate, CostUp, CostDown, PageNumber } =
    useSelector((state) => state.dashSort.params)
  const { totalPageCount } = useSelector((state) => state.dashSort)

  let { data: teachers } = useQuery({
    queryKey: ['teachers'],
    queryFn: getAllTeachers,
  })
  teachers = teachers?.map((teacher) => ({
    id: teacher.teacherId,
    name: teacher.fullName,
  }))

  function handleSearch(searchTerm) {
    dispatch(
      dashSortFilterActions.setSearchTerm(
        searchTerm.trim() === '' ? null : searchTerm.trim(),
      ),
    )
  }
  function handleFilterChange(_, id) {
    dispatch(dashSortFilterActions.setTeacherId(id))
  }
  function handleDateChange(startDate, endDate) {
    dispatch(dashSortFilterActions.setDateRange({ startDate, endDate }))
  }
  function handleClearCalender() {
    dispatch(
      dashSortFilterActions.setDateRange({ startDate: null, endDate: null }),
    )
  }
  function handlePriceChange(costUp, costDown) {
    dispatch(dashSortFilterActions.setCost({ costDown, costUp }))
  }
  function handleClearPrice() {
    dispatch(dashSortFilterActions.setCost({ costDown: null, costUp: null }))
  }
  function handlePaginationChange(pageNumber) {
    dispatch(dashSortFilterActions.setPageNumber(pageNumber))
  }

  return (
    <Modal
      size="full"
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onClose}
      scrollBehavior="inside"
      //className="bg-black"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              جدیدترین دوره ها
              <ModalCloseBtn onClose={onClose} />
            </div>

            <div className="flex gap-4">
              <div className="w-[25%]">
                <SearchBox
                  onSearch={handleSearch}
                  label={<IconLabel icon={Search} label="جست‌ جو دوره" />}
                  prevSearchTerm={Query}
                />
              </div>

              <div className="w-[25%]">
                <SelectOption
                  identifier="teacher"
                  data={teachers}
                  label={<IconLabel icon={Teacher} label="اساتید" />}
                  onFilterChange={handleFilterChange}
                  prevSelectedItem={TeacherId}
                />
              </div>

              <div className="w-[25%]">
                <JalaliDateRangePicker
                  label={<IconLabel icon={Calendar2} label="تاریخ برگزاری" />}
                  onChange={handleDateChange}
                  onClear={handleClearCalender}
                  prevDate={[
                    StartDate && new DateObject(StartDate),
                    EndDate && new DateObject(EndDate),
                  ]}
                  placement="down"
                />
              </div>

              <div className="w-[25%]">
                <PriceSlider
                  onChange={handlePriceChange}
                  onClear={handleClearPrice}
                  previousValue={[CostUp, CostDown]}
                />
              </div>
            </div>
          </ModalHeader>

          <ModalBody>
            <DashTable />
          </ModalBody>

          <ModalFooter>
            <div className="ltr m-auto">
              <Pagination
                currentPage={PageNumber}
                totalPageCount={totalPageCount}
                onChange={handlePaginationChange}
              />
            </div>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  )
}
