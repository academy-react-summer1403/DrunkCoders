import { CourseCard, GridLayout } from '@components'
import { useQuery } from '@tanstack/react-query'
import { getTopCourses } from '@core'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { sortFilterActions } from '@store/index'

export function PopularCourses() {
  const dispatch = useDispatch()
  const queryKey = useMemo(() => ['courses', 'top-courses'], [])

  const { data, isSuccess } = useQuery({
    queryKey,
    queryFn: ({ signal }) => getTopCourses({ count: 4, signal }),
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(sortFilterActions.setPopularCoursesQueryKey(queryKey))
    }
  }, [dispatch, isSuccess])

  return (
    <>
      {data && (
        <GridLayout
          title="محبوب ترین دوره ها"
          description="دوره هایی که بین دانشجو های ما محبوبیت بالایی داشتند"
          card={CourseCard}
          dataArray={data}
          queryKey={queryKey}
        />
      )}
    </>
  )
}
