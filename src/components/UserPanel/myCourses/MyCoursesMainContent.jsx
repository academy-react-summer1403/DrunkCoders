import { MyCoursesTable, Pagination, PicAndDescrption } from '@components/index'
import { filterDataByDateRange } from '@core/index'
import { Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export function MyCoursesMainContent({
  courses,
  handleOpenSummaryModal,
  datePagination,
  // handlePaginationChange,
}) {
  const [allCourses, setAllCourses] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setAllCourses(courses?.listOfMyCourses)
  }, [courses])

  useEffect(() => {
    setAllCourses(
      courses?.listOfMyCourses.filter((_, index) => {
        return index >= (currentPage - 1) * 4 && index < currentPage * 4
      }),
    )
  }, [currentPage, courses])

  useEffect(() => {
    if (courses && datePagination.startDate !== null) {
      const filteredCourses = filterDataByDateRange(
        datePagination,
        courses.listOfMyCourses,
        'lastUpdate',
      )

      setAllCourses(filteredCourses)
    }
  }, [datePagination.startDate])

  return (
    <>
      <div className="flexC no-scrollbar h-full w-full flex-col overflow-x-scroll rounded-2xl bg-white p-4 dark:bg-black">
        <div className="relative w-full grow">
          {allCourses ? (
            <>
              <MyCoursesTable
                listOfMyCourses={allCourses}
                onOpenSummaryModal={handleOpenSummaryModal}
              />

              <section className="h-full w-full flex-col md:hidden">
                {allCourses.map((course) => (
                  <PicAndDescrption
                    key={course.courseId}
                    course={course}
                    onOpenSummaryModal={handleOpenSummaryModal}
                  />
                ))}
                {allCourses.length === 0 && (
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

        {allCourses?.length !== 0 && (
          <div className="ltr m-auto">
            <Pagination
              currentPage={currentPage}
              totalPageCount={Math.ceil(allCourses?.length / 4) || 1}
              onChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
          </div>
        )}
      </div>
    </>
  )
}
