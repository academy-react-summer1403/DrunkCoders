import { Calendar2, Search, Teacher } from '@assets/index';
import { Button, IconLabel, JalaliDateRangePicker, MobileModal, ModalCloseBtn, PriceSlider, SearchBox, SelectOption } from '@components/index'
import { getAllTeachers, getLatestCourses } from '@core/index';
import { Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { dashSortFilterActions } from '@store/dashPanel-filter';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { DateObject } from 'react-multi-date-picker';
import { useDispatch, useSelector } from 'react-redux';

export function DashMobileModal({isOpen,onClose}) {
    const { isOpen: isFilterOpen, onOpen, onClose: closeFilterModal } = useDisclosure();
    const { filterId, dateRange, cost, order } = useSelector(
        (state) => state.sort,
      )
    const { params } = useSelector((state) => state.dashSort)

    const { data, isLoading, error } = useQuery({
      queryKey: ['dashTable', params],
      queryFn: getLatestCourses,
    })
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
      const courses = data?.courseFilterDtos ?? []
      console.log(courses);
  return (
    <>
      <MobileModal
            isOpen={isOpen}
            onOpenChange={onClose}
            dash = {true}
            onOpen = {onOpen}
      >
        {courses.map((course) => {
          const formattedDate = new Date(
            course.lastUpdate,
          ).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
          return (
            <div className='border-b-2 flex gap-4 p-2' key={course.courseId}>
              <Image
              height={80}
              width={110}
              src={course.tumbImageAddress}
              alt="NextUI Album Cover"
              />
              <div>
                  <h1 className='text-medium font-medium'>{course.title}</h1>
                  <p className='text-gray-500'>
                  {course.teacherName}                  
                  </p>
                  <p className='text-gray-500'>
                  {formattedDate}
                  </p>
              </div>
          </div>
          )
        })}

      </MobileModal>
      
      <Modal
        placement='bottom'
        hideCloseButton
        isOpen={isFilterOpen}
        onOpenChange={closeFilterModal}
        size="lg"
        classNames={{
            base:'rounded-t-[35px] rounded-b-none'
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between">
                <p>فیلتر دوره‌ها</p>
                <ModalCloseBtn onClose={onClose} />
              </ModalHeader>
              <ModalBody>
            <div className='flex flex-col gap-4'>
                <div className=''>
                <SearchBox
                    onSearch={handleSearch}
                    label={<IconLabel icon={Search} label="جست‌ جو دوره" />}
                />
                </div>
                <div className=''>
                <SelectOption
                identifier="teacher"
                data={teachers}
                label={<IconLabel icon={Teacher} label="اساتید" />}
                onFilterChange={handleFilterChange}
                prevSelectedItem={filterId.teacher}
                />
                </div>
                <div className=''>
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
                <div className=''>
                <PriceSlider
                previousValue={[cost.costDown, cost.costUp]} />
                </div>
            </div>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
