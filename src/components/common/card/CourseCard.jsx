import { Card as NextUiCard, CardHeader, CardBody } from '@nextui-org/react'
import { pirceFormatter } from '@core'
import {
  CardHeader as CardImage,
  CourseCardDetails,
  LikeAndDislike,
  PriceAndTomanLabel,
} from '@components/index'
import { Link } from 'react-router-dom'
import {
  addDislikeForCourse,
  addLikeForCourse,
  removeCourseLikeOrDislike,
} from '@core/index'
import { useLikeAndDislikeUpdate } from '@hooks/index'

export function CourseCard({
  buttonColor,
  data: course,
  view = 'grid',
  queryKey,
}) {
  // optimistic updating using tanstack query to add like
  const { mutate: addLikeMutatte } = useLikeAndDislikeUpdate(
    addLikeForCourse,
    queryKey,
    'like',
  )
  // optimistic updating using tanstack query to add dislike
  const { mutate: addDislikeMutatte } = useLikeAndDislikeUpdate(
    addDislikeForCourse,
    queryKey,
    'dislike',
  )

  // optimistic updating using tanstack query to remove like or dislike
  const { mutate: removeLikeDislikeMutate } = useLikeAndDislikeUpdate(
    removeCourseLikeOrDislike,
    queryKey,
    'remove',
  )

  function handleLikeAndDislike(identifier) {
    if (identifier === 'like') {
      addLikeMutatte(course.courseId)
    } else if (identifier === 'dislike') {
      addDislikeMutatte(course.courseId)
    } else {
      const fd = new FormData()
      fd.append('CourseLikeId', course.userLikedId || course.userLikeId)
      removeLikeDislikeMutate({
        courseIdFormData: fd,
        courseId: course.courseId,
      })
    }
  }

  return (
    <>
      {course && (
        <NextUiCard
          className={`grid rounded-3xl bg-[#787878] bg-opacity-[0.13] text-[#272727] shadow-none dark:bg-white/20 ${view === 'grid' ? 'grid-cols-1' : 'lg:h-[273px] lg:grid-cols-12'}`}
        >
          <CardHeader
            as={Link}
            to={'/courses/' + course.courseId}
            className={`overflow-hidden rounded-3xl bg-[#FF9090] p-0 ${view === 'list' ? 'h-[225px] lg:col-span-5 lg:h-full' : 'h-[225px]'}`}
          >
            <CardImage
              buttonColor={buttonColor}
              data={course}
              type="course"
              view={view}
            />
          </CardHeader>

          <CardBody
            className={`mt-2 flex flex-col gap-3 px-3 ${view === 'list' ? 'lg:col-span-7' : ''}`}
          >
            <CourseCardDetails course={course} />

            <div
              className={`mb- flex flex-wrap items-center justify-between gap-2 dark:text-white`}
            >
              <PriceAndTomanLabel
                price1={course.cost}
                className={view === 'list' ? 'order-1' : ''}
                tomanColor
              />

              <LikeAndDislike
                userLikeStatus={{
                  like: course.userIsLiked,
                  dislike: course.currentUserDissLike || course.userIsDissLiked,
                }}
                onLikeAndDislike={handleLikeAndDislike}
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
