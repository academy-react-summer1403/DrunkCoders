import {
  Button,
  MobileModal,
  PanelShortFilterModal,
  SummaryModal,
  TableMainLayout,
  ReservationSort,
} from '@components/index'

import { useEffect, useState } from 'react'
import { filterDataByDateRange } from '@core/index'
import { useDisclosure } from '@nextui-org/react'

export function MyCoursesAndArticlesLayout({
  title,
  data,
  renderCell,
  onSort,
  sort,
  type,
  headerColumns,
}) {
  const [params, setParams] = useState({
    searchTerm: null,
    startDate: null,
    endDate: null,
    accept: null,
  })
  const [newData, setNewData] = useState(data)
  const [currentData, setCurrentData] = useState(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: summaryIsOpen,
    onOpen: summaryOnOpen,
    onOpenChange: summaryOnOpenChange,
  } = useDisclosure()

  function handleSearch(searchTerm) {
    setParams((prevState) => ({
      ...prevState,
      searchTerm: searchTerm.trim() === '' ? null : searchTerm.trim(),
    }))
  }
  function handleDateChange(startDate, endDate) {
    setParams((prevState) => ({ ...prevState, startDate, endDate }))
  }
  function handleClearCalender() {
    setParams((prevState) => ({
      ...prevState,
      startDate: null,
      endDate: null,
    }))
  }

  // console.log(data)

  useEffect(() => {
    if (data) {
      let filteredData = data

      if (params.startDate !== null) {
        filteredData = filterDataByDateRange(
          { startDate: params.startDate, endDate: params.endDate },
          filteredData,
          'startDate',
        )
      }

      if (params.searchTerm) {
        filteredData = filteredData.filter(
          (item) =>
            item.courseName.includes(params.searchTerm) ||
            item.teacherName.includes(params.searchTerm),
        )
      }

      setNewData(filteredData)
    }
  }, [params.startDate, params.endDate, params.searchTerm, data])

  function handleOpenSummaryModal(data) {
    setCurrentData(data)
    summaryOnOpen()
  }

  return (
    <>
      {currentData && (
        <SummaryModal
          isOpen={summaryIsOpen}
          onOpenChange={summaryOnOpenChange}
          title={title}
          data={currentData}
          type={type}
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
          dateRange={{ startDate: params.startDate, endDate: params.endDate }}
          prevSearchTerm={params.searchTerm}
          relative
          onSort={onSort}
          sort={sort}
        />
      </MobileModal>

      <div className="mb-5 mt-6 flex items-center justify-between sm:mb-12">
        <h1 className="text-2xl font-medium sm:text-[32px]"> {title}</h1>
        <Button onClick={onOpen} className="px-6 py-3 font-medium sm:hidden">
          فیلتر
        </Button>
      </div>

      <div className="hidden flex-col flex-wrap gap-5 sm:flex lg:flex-row">
        <PanelShortFilterModal
          handleSearch={handleSearch}
          onDateChange={handleDateChange}
          onClearCalender={handleClearCalender}
        />
        {onSort && <ReservationSort onSort={onSort} sort={sort} />}
      </div>

      <TableMainLayout
        allData={newData}
        handleOpenSummaryModal={handleOpenSummaryModal}
        renderCell={renderCell}
        onSort={onSort}
        key={newData}
        tableHeaders={headerColumns}
      />
    </>
  )
}
