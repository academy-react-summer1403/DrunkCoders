import { useState } from 'react'
import { Pagination, PicAndDescrption, DataTable } from '@components/index'
import { Spinner } from '@nextui-org/react'

export function TableMainLayout({
  allData,
  handleOpenSummaryModal,
  renderCell,
  onSort,
  tableHeaders,
}) {
  const [currentPage, setCurrentPage] = useState(1)

  const paginatedData = allData?.filter((_, index) => {
    return index >= (currentPage - 1) * 4 && index < currentPage * 4
  })

  return (
    <div className="flexC no-scrollbar h-full w-full flex-col overflow-x-scroll rounded-2xl bg-white p-4 dark:bg-black">
      <div className="relative w-full grow">
        {paginatedData ? (
          <>
            <DataTable
              tableBody={paginatedData}
              tableHeader={tableHeaders}
              renderCell={renderCell}
              onOpenSummaryModal={handleOpenSummaryModal}
            />

            <section className="h-full w-full flex-col md:hidden">
              {paginatedData.map((course) => (
                <PicAndDescrption
                  key={course.courseId}
                  course={course}
                  onOpenSummaryModal={handleOpenSummaryModal}
                  myReservation={onSort}
                />
              ))}
              {paginatedData.length === 0 && (
                <p className="absolute right-1/2 top-1/2 mx-auto -translate-y-[50%] translate-x-[50%]">
                  دوره‌‌ایی یافت نشد
                </p>
              )}
            </section>
          </>
        ) : (
          <Spinner
            className="absolute right-1/2 top-1/2 mx-auto -translate-y-[50%] translate-x-[50%]"
            size="lg"
            label="در حال دریافت ..."
            labelColor="primary"
          />
        )}
      </div>

      {paginatedData?.length !== 0 && paginatedData && (
        <div className="ltr m-auto pt-5">
          <Pagination
            currentPage={currentPage}
            totalPageCount={Math.ceil(allData?.length / 4) || 1}
            onChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </div>
      )}
    </div>
  )
}
