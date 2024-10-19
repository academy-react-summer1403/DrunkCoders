import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../app/App'
import { useSelector } from 'react-redux'
import { isEqual } from 'lodash'

export function useLikeAndDislikeUpdate(mutationFn, queryKey, identifier) {
  const { popularCoursesQueryKey, allCoursesQueryKey } = useSelector(
    (state) => state.sort,
  )

  const userLikeStatus = {
    userIsLiked: identifier === 'like' ? true : false,
    currentUserDissLike: identifier === 'dislike' ? true : false,
  }
  const popularUserLikeStatus = {
    userIsLiked: identifier === 'like' ? true : false,
    userIsDissLiked: identifier === 'dislike' ? true : false,
  }

  const allCourseMutation = useMutation({
    mutationFn,
    onMutate: async (courseId) => {
      await queryClient.cancelQueries(queryKey) // canceling outgoing refetch
      const prevCourses = queryClient.getQueryData(queryKey) // copy prev course data
      queryClient.setQueryData(queryKey, (oldCourses) => {
        const updatedCourses = oldCourses?.courseFilterDtos.map((course) =>
          course.courseId ===
          (identifier === 'remove' ? courseId.courseId : courseId)
            ? { ...course, ...userLikeStatus }
            : course,
        )
        return {
          totalCount: oldCourses.totalCount,
          courseFilterDtos: updatedCourses,
        }
      })
      return { prevCourses }
    },
    onError: (err, courseId, context) => {
      console.log(err)
      queryClient.setQueryData(queryKey, context.prevCourses)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })

  const popularCourseMutation = useMutation({
    mutationFn,
    onMutate: async (courseId) => {
      await queryClient.cancelQueries(queryKey) // canceling outgoing refetch
      const prevCourses = queryClient.getQueryData(queryKey) // copy prev course data
      queryClient.setQueryData(queryKey, (oldCourses) => {
        const updatedCourses = oldCourses?.map((course) =>
          course.courseId ===
          (identifier === 'remove' ? courseId.courseId : courseId)
            ? { ...course, ...popularUserLikeStatus }
            : course,
        )
        return updatedCourses
      })
      return { prevCourses }
    },
    onError: (err, courseId, context) => {
      console.log(err)
      queryClient.setQueryData(queryKey, context.prevCourses)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })

  if (isEqual(queryKey, allCoursesQueryKey)) return allCourseMutation
  else return popularCourseMutation
}
