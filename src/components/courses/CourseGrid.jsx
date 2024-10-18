import { CourseCard } from '..'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getCoursesWithPagination } from '@core/index'
import { useEffect, useMemo, useRef } from 'react'
import { sortFilterActions } from '@store/course-sort-filter-slice'

export function CourseGrid() {
  const dispatch = useDispatch()
  let view = useSelector((state) => state.view.view)
  const {
    pagination,
    order,
    searchTerm,
    descendingOrder,
    filterId,
    cost,
    dateRange,
    params: reduxParams,
  } = useSelector((state) => state.sort)
  const paramsShallow = useRef(reduxParams)

  const params = useMemo(
    () => ({
      PageNumber: pagination.currentPage,
      RowsOfPage: 9,
      SortingCol:
        order === 'costAsc' || order === 'costDesc'
          ? 'cost'
          : order === ''
            ? null
            : order,
      SortType: descendingOrder ? 'DESC' : 'ASC',
      Query: searchTerm,
      TechCount: filterId.category ? 1 : 0,
      ListTech: filterId.category === '' ? null : filterId.category,
      courseLevelId: filterId.level,
      TeacherId: filterId.teacher,
      CostDown: cost.costDown,
      CostUp: cost.costUp,
      StartDate: dateRange.startDate,
      EndDate: dateRange.endDate,
    }),
    [pagination, order, descendingOrder, searchTerm, filterId, cost, dateRange],
  )

  const { data: courses } = useQuery({
    queryKey: ['courses', params],
    queryFn: ({ signal }) => getCoursesWithPagination({ params, signal }),
  })

  useEffect(() => {
    if (courses) {
      dispatch(
        sortFilterActions.setTotalPageCount(Math.ceil(courses.totalCount / 9)),
      )
    }
  }, [courses, dispatch])

  return (
    <>
      {courses && (
        <div
          className={`mt-7 grid gap-4 ${view === 'list' ? 'grid-cols-1' : '3xl:grid-cols-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 min-[1700px]:grid-cols-4'}`}
        >
          {courses.courseFilterDtos.map((course, index) => (
            <CourseCard
              key={course.courseId}
              data={course}
              buttonColor={index % 3 === 1 ? '#DE59FF' : '#5A7EFF'}
              view={view}
              filterParams={params}
            />
          ))}
          {courses.courseFilterDtos.length === 0 && (
            <div className="mx-auto mt-20">دیتایی وجود ندارد.</div>
          )}
        </div>
      )}
    </>
  )
}