import { CourseCard } from '..'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getCoursesWithPagination } from '@core/index'
import { courseViewModeActions } from '@store/course-view-mode-slice'

export function CourseGrid() {
  const view = useSelector((state) => state.view.view)
  const dispatch = useDispatch()

  const params = {
    PageNumber: 1,
    RowsOfPage: 9,
    SortingCol: 'Active',
    SortType: 'DESC',
  }

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: ({ signal }) => getCoursesWithPagination({ params, signal }),
    onSuccess: (data) => {
      dispatch(courseViewModeActions.setTotalPageCount(data.totalCount / 9))
    },
  })

  return (
    <div
      className={`mt-7 grid gap-4 ${view === 'list' ? 'grid-cols-1' : 'md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'}`}
    >
      {courses?.courseFilterDtos.map((course, index) => (
        <CourseCard
          key={course.courseId}
          data={course}
          buttonColor={index % 3 === 1 ? '#DE59FF' : '#5A7EFF'}
          view={view}
        />
      ))}
    </div>
  )
}
