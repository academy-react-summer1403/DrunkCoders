import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../app/App'

export function useLikeAndDislikeUpdate(mutationFn, filterParams, identifier) {
  const userLikeStatus = {
    userIsLiked: identifier === 'like' ? true : false,
    currentUserDissLike: identifier === 'dislike' ? true : false,
  }

  //, filterParams
  // console.log(identifier)

  return useMutation({
    mutationFn,
    onMutate: async (courseId) => {
      await queryClient.cancelQueries(['courses', filterParams]) // canceling outgoing refetch
      const prevCourses = queryClient.getQueryData(['courses', filterParams]) // copy prev course data
      queryClient.setQueryData(['courses', filterParams], (oldCourses) => {
        const updatedCourses = oldCourses?.courseFilterDtos.map((course) =>
          course.courseId ===
          (identifier === 'remove' ? courseId.courseId : courseId)
            ? { ...course, ...userLikeStatus }
            : course,
        )
        console.log(identifier)
        console.log(updatedCourses)
        return {
          totalCount: oldCourses.totalCount,
          courseFilterDtos: updatedCourses,
        }
      })
      return { prevCourses }
    },
    onError: (err, courseId, context) => {
      console.log(err)
      queryClient.setQueryData(['courses', filterParams], context.prevCourses)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['courses', filterParams])
    },
  })
}
