import {  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';
import { DashTable } from './DashTable';
import { Button, IconLabel, JalaliDateRangePicker, ModalCloseBtn, Pagination, PriceSlider, SearchBox, SelectOption } from '@components/index';
import { Calendar2, Search, Teacher } from '@assets/index';
import { dashSortFilterActions } from '@store/dashPanel-filter';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getAllTeachers } from '@core/index';
import { DateObject } from 'react-multi-date-picker'


export function DashModal({ isOpen, onClose }) {
  const { filterId, dateRange, cost, order } = useSelector(
    (state) => state.sort,
  )

  const dispatch = useDispatch()

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
  function handleFilterChange(identifier, id) {
    dispatch(
      dashSortFilterActions.setFilterId({ filterIdentifier: identifier, id }),
    )
  }
  function handleDateChange(startDate, endDate) {
    dispatch(dashSortFilterActions.setDateRange({ startDate, endDate }))
  }
  function handleClearCalender() {
    dispatch(dashSortFilterActions.setDateRange({ startDate: null, endDate: null }))
  }
  return (
    <Modal 
      size='full'
      hideCloseButton
      isOpen={isOpen} 
      onOpenChange={onClose}
      scrollBehavior="inside"
    >
      <ModalContent>
        <>
          <ModalHeader className='flex flex-col gap-2'>
            <div className="flex justify-between w-full">
            جدیدترین دوره ها
            <ModalCloseBtn onClose={onClose}/>
            </div>
            <div className='flex gap-4'>
              <div className='w-[25%] '>
              <SearchBox
                onSearch={handleSearch}
                label={<IconLabel icon={Search} label="جست‌ جو دوره" />}
              />
              </div>
              <div className='w-[25%] '>
              <SelectOption
              identifier="teacher"
              data={teachers}
              label={<IconLabel icon={Teacher} label="اساتید" />}
              onFilterChange={handleFilterChange}
              prevSelectedItem={filterId.teacher}
             />
              </div>
             <div className='w-[25%]'>
              <JalaliDateRangePicker
                label={<IconLabel icon={Calendar2} label="تاریخ برگزاری" />}
                onChange={handleDateChange}
                onClear={handleClearCalender}
                prevDate={[
                  dateRange.startDate && new DateObject(dateRange.startDate),
                  dateRange.endDate && new DateObject(dateRange.endDate),
                ]}
              />
             </div>
             <div className='w-[25%] '>
              <PriceSlider
              previousValue={[cost.costDown, cost.costUp]} />
             </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <DashTable />
          </ModalBody>
          <ModalFooter>
            <div className='m-auto ltr'>
              <Pagination
              totalPageCount={5}/>
            </div>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
