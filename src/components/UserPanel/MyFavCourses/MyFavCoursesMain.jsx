import { MyCoursesAndArticlesLayout } from '@components/index'
import {
  getCourseById,
  getMyFavoriteCourses,
  myFavCoursesColumns,
} from '@core/index'
import { useQueries, useQuery } from '@tanstack/react-query'
import { MyFavCoursesRenderCells } from './MyFavCoursesRenderCells'

export function MyFavCoursesMain() {
  const { data, isLoading } = useQuery({
    queryKey: ['myFavCourses'],
    queryFn: getMyFavoriteCourses,
  })

  const ids = data
    ? data.favoriteCourseDto.map((course) => course.courseId)
    : []

  let { data: completeFavCourse, pending } = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['single-favCourse', id],
      queryFn: () => getCourseById(id),
      enabled: Boolean(ids.length !== 0),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      }
    },
  })

  //  || completeFavCourse.length === 0

  completeFavCourse =
    completeFavCourse.some((course) => course === undefined) ||
    pending ||
    isLoading
      ? null
      : completeFavCourse.map((course) => {
          course.courseName = course.title
          course.startDate = course.startTime
          course.tumbImageAddress = course.imageAddress
          course.levelName = course.courseLevelName
          course.statusName = course.courseStatusName
          course.technologyList = course.techs.join('‌‌‌‌‌‌‌‌‌‌،')
          return course
        })

  // console.log(completeFavCourse)

  return (
    <MyCoursesAndArticlesLayout
      title="علاقه‌مندی دوره"
      data={completeFavCourse}
      renderCell={MyFavCoursesRenderCells}
      key={completeFavCourse}
      onSort={null}
      sort={null}
      type="myFavCourses"
      headerColumns={myFavCoursesColumns}
    />
  )
}
