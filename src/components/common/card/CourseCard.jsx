import { Card as NextUiCard, CardHeader, CardBody } from '@nextui-org/react'

import { pirceFormatter } from '@core'
import {
  CardHeader as CardImage,
  CourseCardDetails,
  LikeAndDislike,
} from '@components/index'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  addDislikeForCourse,
  addLikeForCourse,
  removeCourseLikeOrDislike,
} from '@core/index'

export function CourseCard({
  buttonColor,
  data: course,
  view = 'grid',
  filterParams,
}) {
  const queryClient = useQueryClient()

  // optimistic updating using tanstack query to add like
  const { mutate: addLikeMutatte } = useMutation({
    mutationFn: addLikeForCourse,
    onMutate: async (courseId) => {
      await queryClient.cancelQueries(['courses', filterParams]) // canceling outgoing refetch
      const prevCourses = queryClient.getQueryData(['courses', filterParams]) // copy prev course data
      queryClient.setQueryData(['courses', filterParams], (oldCourses) => {
        // console.log(oldCourses)
        const updatedCourses = oldCourses?.courseFilterDtos.map((course) =>
          course.courseId === courseId
            ? { ...course, userIsLiked: true, currentUserDissLike: false }
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
      queryClient.setQueryData(['courses', filterParams], context.prevCourses)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['courses', filterParams])
    },
  })

  // optimistic updating using tanstack query to add dislike
  const { mutate: addDislikeMutatte } = useMutation({
    mutationFn: addDislikeForCourse,
    onMutate: async (courseId) => {
      await queryClient.cancelQueries(['courses', filterParams])
      const prevCourses = queryClient.getQueryData(['courses', filterParams])
      queryClient.setQueryData(['courses', filterParams], (oldCourses) => {
        const updatedCourses = oldCourses?.courseFilterDtos.map((course) =>
          course.courseId === courseId
            ? { ...course, currentUserDissLike: true, userIsLiked: false }
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
      queryClient.setQueryData(['courses', filterParams], context.prevCourses)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['courses', filterParams])
    },
  })

  // optimistic updating using tanstack query to remove like or dislike
  const { mutate: removeLikeDislikeMutate } = useMutation({
    mutationFn: removeCourseLikeOrDislike,
    onMutate: async (courseId) => {
      await queryClient.cancelQueries(['courses', filterParams])
      const prevCourses = queryClient.getQueryData(['courses', filterParams])
      queryClient.setQueryData(['courses', filterParams], (oldCourses) => {
        const updatedCourses = oldCourses?.courseFilterDtos.map((course) =>
          course.courseId === courseId
            ? { ...course, currentUserDissLike: false, userIsLiked: false }
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
      queryClient.setQueryData(['courses', filterParams], context.prevCourses)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['courses', filterParams])
    },
  })

  function handleLikeAndDislike(identifier) {
    if (identifier === 'like') {
      console.log(course.courseId)
      addLikeMutatte(course.courseId)
    } else if (identifier === 'dislike') {
      addDislikeMutatte(course.courseId)
    } else {
      const fd = new FormData()
      fd.append('CourseLikeId', course.courseId)
      removeLikeDislikeMutate(fd)
    }
  }

  return (
    <>
      {course && (
        <NextUiCard
          className={`grid rounded-3xl bg-[#787878] bg-opacity-[0.13] text-[#272727] shadow-none dark:bg-white/20 ${view === 'grid' ? 'grid-cols-1' : 'grid-cols-12'}`}
        >
          <CardHeader
            as={Link}
            to={'/courses/' + course.courseId}
            className={`overflow-hidden rounded-3xl bg-[#FF9090] p-0 ${view === 'list' ? 'hg-full col-span-5 h-[272px]' : 'h-[225px]'}`}
          >
            <CardImage
              buttonColor={buttonColor}
              data={course}
              type="course"
              view={view}
            />
          </CardHeader>

          <CardBody
            className={`mt-2 flex flex-col gap-3 px-3 ${view === 'list' ? 'col-span-7' : ''}`}
          >
            {/* <div className="relative h-[225px] w-full overflow-hidden rounded-3xl bg-[#FF9090] p-0"></div> */}

            <CourseCardDetails course={course} />

            <div
              className={`mb-2 flex flex-wrap items-center justify-between gap-2 dark:text-white`}
            >
              <div
                className={`flex items-center gap-1 text-xl ${view === 'list' ? 'order-1' : ''}`}
              >
                <span className="font-medium">
                  {pirceFormatter(course?.cost) ?? '1,880,000'}
                </span>
                <span className="text-sm text-[#3772FF]">تومان</span>
              </div>

              <LikeAndDislike
                userLikeStatus={{
                  like: course.userIsLiked,
                  dislike: course.currentUserDissLike,
                }}
                onLikeAndDislike={handleLikeAndDislike}
                className={`${view === 'list' ? 'mb-0' : ''} `}
                like={course.likeCount}
                dislike={course.dissLikeCount}
                view={view}
              />
            </div>
          </CardBody>

          {/* <CardFooter className="mb-2 flex flex-row items-center justify-between gap-2 dark:text-white lg:flex-col lg:items-start xl:flex-row xl:items-center xl:justify-between"></CardFooter> */}
        </NextUiCard>
      )}
    </>
  )
}
