import { Card as NextUiCard, CardHeader, CardBody } from '@nextui-org/react'
import { pirceFormatter } from '@core'
import {
  CardHeader as CardImage,
  CourseCardDetails,
  LikeAndDislike,
} from '@components/index'
import { Link } from 'react-router-dom'
import {
  addDislikeForCourse,
  addLikeForCourse,
  removeCourseLikeOrDislike,
} from '@core/index'
import { useLikeAndDislikeUpdate } from '@hooks/index'
import { useSelector } from 'react-redux'

export function CourseCard({
  buttonColor,
  data: course,
  view = 'grid',
  filterParams,
}) {
  // const { params } = useSelector((state) => state.sort)

  // optimistic updating using tanstack query to add like
  const { mutate: addLikeMutatte } = useLikeAndDislikeUpdate(
    addLikeForCourse,
    filterParams,
    'like',
  )
  // optimistic updating using tanstack query to add dislike
  const { mutate: addDislikeMutatte } = useLikeAndDislikeUpdate(
    addDislikeForCourse,
    filterParams,
    'dislike',
  )

  // optimistic updating using tanstack query to remove like or dislike
  const { mutate: removeLikeDislikeMutate } = useLikeAndDislikeUpdate(
    removeCourseLikeOrDislike,
    filterParams,
    'remove',
  )

  function handleLikeAndDislike(identifier) {
    if (identifier === 'like') {
      addLikeMutatte(course.courseId)
    } else if (identifier === 'dislike') {
      addDislikeMutatte(course.courseId)
    } else {
      const fd = new FormData()
      fd.append('CourseLikeId', course.userLikedId)
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
              <div
                className={`flex items-center gap-1 text-xl ${view === 'list' ? 'order-1' : ''}`}
              >
                <span className="font-medium">
                  {pirceFormatter(course.cost) ?? '1,880,000'}
                </span>
                <span className="text-sm text-[#3772FF]">تومان</span>
              </div>

              <LikeAndDislike
                userLikeStatus={{
                  like: course.userIsLiked,
                  dislike: course.currentUserDissLike,
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
