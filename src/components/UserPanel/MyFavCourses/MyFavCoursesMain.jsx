import { MyCoursesAndArticlesLayout } from '@components/index'
import {
  getCourseById,
  getMyFavoriteCourses,
  myFavCoursesColumns,
} from '@core/index'
import { useQueries, useQuery } from '@tanstack/react-query'
import { MyFavCoursesRenderCells } from './MyFavCoursesRenderCells'

export function MyFavCoursesMain() {
  const { data, isSuccess: reserveSuccess } = useQuery({
    queryKey: ['myFavCourses'],
    queryFn: getMyFavoriteCourses,
  })

  const ids = data
    ? data.favoriteCourseDto.map((course) => course.courseId)
    : []

  let { data: CompleteFavCourse } = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['single-favCourse', id],
      queryFn: () => getCourseById(id),
      enabled: Boolean(id),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        //   pending: results.some((result) => result.isPending),
      }
    },
  })

  CompleteFavCourse =
    CompleteFavCourse.some((course) => course === undefined) ||
    CompleteFavCourse.length === 0
      ? []
      : CompleteFavCourse.map((course) => {
          course.courseName = course.title
          course.startDate = course.startTime
          course.tumbImageAddress = course.imageAddress
          course.levelName = course.courseLevelName
          course.statusName = course.courseStatusName
          course.technologyList = course.techs.join('‌‌‌‌‌‌‌‌‌‌،')
          return course
        })

  return (
    <MyCoursesAndArticlesLayout
      title="علاقه‌مندی دوره"
      data={CompleteFavCourse}
      renderCell={MyFavCoursesRenderCells}
      key={CompleteFavCourse}
      onSort={null}
      sort={null}
      type="myFavCourses"
      headerColumns={myFavCoursesColumns}
    />
  )
}
