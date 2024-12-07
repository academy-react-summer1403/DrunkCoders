import React, { useEffect } from 'react'
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { HidePassword } from '@assets/index'
import { useQuery } from '@tanstack/react-query'
import { getLatestCourses } from '@core/index'
import { useDispatch, useSelector } from 'react-redux'
import { dashSortFilterActions } from '@store/dashPanel-filter'
import { useNavigate } from 'react-router-dom'

export function DashTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { params } = useSelector((state) => state.dashSort)

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashTable', params],
    queryFn: getLatestCourses,
  })

  useEffect(() => {
    if (data) {
      dispatch(
        dashSortFilterActions.setTotalPageCount(Math.ceil(data.totalCount / 9)),
      )
    }
  }, [data, dispatch])

  const courses = data?.courseFilterDtos ?? []

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner size="lg" label="در حال دریافت ..." labelColor="primary" />
      </div>
    );
  }
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <section className="hidden md:block">
        <Table removeWrapper aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>نام دوره</TableColumn>
            <TableColumn>درباره دوره</TableColumn>
            <TableColumn>اساتید دوره</TableColumn>
            <TableColumn>تاریخ برگزاری</TableColumn>
            <TableColumn>قیمت دوره</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {courses.slice(0, 10).map((course) => {
              const formattedDate = new Date(
                course.lastUpdate,
              ).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })

              return (
                <TableRow key={course.courseId}>
                  <TableCell className="max-w-8 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium">
                    {course.title}
                  </TableCell>
                  <TableCell className="ml-2 max-w-8 overflow-hidden text-ellipsis whitespace-nowrap text-gray-500">
                    {course.describe}
                  </TableCell>
                  <TableCell className="ml-2 max-w-8 overflow-hidden text-ellipsis whitespace-nowrap">
                    {course.teacherName}
                  </TableCell>
                  <TableCell className="max-w-8">{formattedDate}</TableCell>
                  <TableCell className="max-w-8 overflow-hidden text-ellipsis whitespace-nowrap text-[16px]">
                    {course.cost}تومان
                  </TableCell>
                  <TableCell>
                    <Tooltip content="مشاهده">
                      <span
                        onClick={() => navigate('/courses/'+ course.courseId)}
                      >
                        <HidePassword />
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </section>
      <section className="mt-5 flex flex-col gap-2 p-2 md:hidden">
        {courses.map((course) => {
          const formattedDate = new Date(course.lastUpdate).toLocaleDateString(
            'fa-IR',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            },
          )
          return (
            <div
              key={course.courseId}
              className="flex justify-between border-b-2"
            >
              <div className="flex flex-col">
                <h1 className="text-medium font-medium">{course.title}</h1>
                <p className="mt-3 text-sm text-gray-500">
                  {course.teacherName}
                </p>
                <p className="mb-3 text-sm text-gray-500 dark:text-white">
                  {formattedDate}
                </p>
              </div>
              <div>
                <Tooltip content="مشاهده">
                  <div>
                    <HidePassword />
                  </div>
                </Tooltip>
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}
