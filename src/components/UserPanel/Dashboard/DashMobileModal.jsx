import { Calendar2, Search, Teacher } from '@assets/index';
import { Button, IconLabel, JalaliDateRangePicker, ModalCloseBtn, PriceSlider, SearchBox, SelectOption } from '@components/index'
import { getAllTeachers } from '@core/index';
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
    <>
    <Modal 
        hideCloseButton
        isOpen={isOpen} 
        onOpenChange={onClose}
        scrollBehavior="inside"
        size='5xl'
        classNames={{
            base:'rounded-t-[35px] h-screen rounded-b-none'
        }}
        >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-8">
                <header className='flex justify-between'>
                    <p>
                    جدیدترین دوره ها
                    </p>
                    <ModalCloseBtn onClose={onClose}/>
                </header>
                
                <Button className='w-fit text-lg' onPress={onOpen}>
                فیلتر
                </Button>
              </ModalHeader>
              <ModalBody>
                <div className='border-b-2 flex gap-4 p-2'>
                    <Image
                    height={80}
                    width={110}
                    src="https://nextui.org/images/album-cover.png"
                    alt="NextUI Album Cover"
                    />
                    <div>
                        <h1 className='text-medium font-medium'>ری‌اکت جی‌اس</h1>
                        <p className='text-gray-500'>
                        محسن اسفندیاری ، مهدی اصغری
                        </p>
                        <p className='text-gray-500'>
                        25 اردیبهشت 1403
                        </p>
                    </div>
                </div>
              </ModalBody>
              <ModalFooter>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
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
