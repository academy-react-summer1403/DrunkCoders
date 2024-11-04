import {
  getCoursesWithPagination,
  getMyCoursesReserve,
  myReservationsColumns,
} from '@core/index'
import {
  MyCoursesAndArticlesLayout,
  MyReservationsRendercell,
} from '@components/index'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

function removeDuplicateById(array) {
  const seenIds = new Set()
  return array.filter((obj) => {
    if (seenIds.has(obj.courseId)) {
      return false // Duplicate found, filter it out
    }
    seenIds.add(obj.courseId) // Add unique ID to set
    return true // Keep unique object by ID
  })
}

export function MyReservationsMain() {
  const [sort, setSort] = useState(null)

  const { data: reserveCourses, isSuccess: reserveSuccess } = useQuery({
    queryKey: ['myReservations'],
    queryFn: getMyCoursesReserve,
  })

  const { data: allCourses, isSuccess: allSuccess } = useQuery({
    queryKey: ['courses'],
    queryFn: () =>
      getCoursesWithPagination({
        params: { PageNumber: 1, RowsOfPage: 100 },
      }),
  })

  let filteredCourses = useMemo(() => {
    if (reserveCourses && allSuccess) {
      const filtered = reserveCourses.filter((reserve) => {
        const found = allCourses.courseFilterDtos.find(
          (course) => course.courseId === reserve.courseId,
        )
        if (found) {
          reserve.teacherName = found.teacherName
          reserve.cost = found.cost
          reserve.tumbImageAddress = found.tumbImageAddress
          reserve.levelName = found.levelName
          reserve.statusName = found.statusName
          reserve.technologyList = found.technologyList
          reserve.cost = found.cost
          reserve.startDate = found.lastUpdate

          return reserve
        }
        return null
      })

      return removeDuplicateById(filtered)
    }
    return null
  }, [reserveCourses, allCourses, allSuccess])

  function handleSort(accept) {
    setSort(accept)
  }

  if (filteredCourses && sort !== null) {
    filteredCourses = filteredCourses.filter((course) => course.accept === sort)
  }

  return (
    <MyCoursesAndArticlesLayout
      title="رزرو من"
      data={filteredCourses}
      renderCell={MyReservationsRendercell}
      key={filteredCourses}
      onSort={handleSort}
      sort={sort}
      type="myReservations"
      headerColumns={myReservationsColumns}
    />
  )
}
