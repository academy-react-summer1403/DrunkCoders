import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import {
  Button,
  MobileModal,
  PanelShortFilterModal,
  SummaryModal,
  MyCoursesMainContent,
} from '@components/index'
import { getAllMyCourses } from '@core/index'
import { useDisclosure } from '@nextui-org/react'

export function MyCoursesLayout() {
  const [params, setParams] = useState({
    PageNumber: 1,
    RowsOfPage: 100,
    Query: null,
  })
  const [datePagination, setDatePagination] = useState({
    startDate: null,
    endDate: null,
  })
  const [currentCourse, setCurrentCourse] = useState(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: summaryIsOpen,
    onOpen: summaryOnOpen,
    onOpenChange: summaryOnOpenChange,
  } = useDisclosure()

  const { data: courses } = useQuery({
    queryKey: ['myCourses', params],
    queryFn: () => getAllMyCourses(params),
  })

  function handleSearch(searchTerm) {
    setParams((prevState) => ({
      ...prevState,
      Query: searchTerm.trim() === '' ? null : searchTerm.trim(),
    }))
  }

  function handleDateChange(startDate, endDate) {
    setDatePagination((prevState) => ({ startDate, endDate }))
  }

  function handleClearCalender() {
    setDatePagination((prevState) => ({
      startDate: null,
      endDate: null,
    }))
  }

  function handleOpenSummaryModal(course) {
    setCurrentCourse(course)
    summaryOnOpen()
  }

  return (
    <>
      {currentCourse && (
        <SummaryModal
          isOpen={summaryIsOpen}
          onOpenChange={summaryOnOpenChange}
          title="دوره"
          data={currentCourse}
          type="myCourses"
        />
      )}

      <MobileModal
        confirmButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="فیلتر "
      >
        <PanelShortFilterModal
          handleSearch={handleSearch}
          onDateChange={handleDateChange}
          onClearCalender={handleClearCalender}
          dateRange={datePagination}
          prevSearchTerm={params.Query}
          relative
        />
      </MobileModal>

      <div className="mb-5 mt-6 flex items-center justify-between sm:mb-12">
        <h1 className="text-2xl font-medium sm:text-[32px]">دوره من</h1>
        <Button onClick={onOpen} className="px-6 py-3 font-medium sm:hidden">
          فیلتر
        </Button>
      </div>

      <div className="hidden sm:block">
        <PanelShortFilterModal
          handleSearch={handleSearch}
          onDateChange={handleDateChange}
          onClearCalender={handleClearCalender}
        />
      </div>

      <MyCoursesMainContent
        courses={courses}
        handleOpenSummaryModal={handleOpenSummaryModal}
        datePagination={datePagination}
        key={datePagination.startDate}
      />
    </>
  )
}
