import { Card as NextUiCard, CardHeader, CardBody } from '@nextui-org/react'

import { pirceFormatter } from '@core'
import {
  CardHeader as CardImage,
  CourseCardDetails,
  LikeAndDislike,
} from '@components/index'
import { useSelector } from 'react-redux'

// ${view === 'grid' ? 'grid-cols-1' : 'grid-cols-12'}
// ${view === 'list' ? 'col-span-5' : ''}
//${view === 'list' ? 'col-span-7' : ''}

export function CourseCard({ buttonColor, data: course, view = 'grid' }) {
  return (
    <NextUiCard
      className={`grid rounded-3xl bg-[#787878] bg-opacity-[0.13] text-[#272727] shadow-none dark:bg-white/20 ${view === 'grid' ? 'grid-cols-1' : 'grid-cols-12'}`}
    >
      <CardHeader
        className={`overflow-hidden rounded-3xl bg-[#FF9090] p-0 ${view === 'list' ? 'col-span-5' : ''}`}
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
          className={`mb-2 flex items-center justify-between gap-2 dark:text-white xl:items-center xl:justify-between ${view === 'list' ? 'flex-row-reverse xl:flex-row-reverse' : 'flex-row lg:flex-col lg:items-start xl:flex-row'}`}
        >
          <div className="flex items-center gap-1 text-xl">
            <span className="font-medium">
              {pirceFormatter(course?.cost) ?? '1,880,000'}
            </span>
            <span className="text-sm text-[#3772FF]">تومان</span>
          </div>

          <LikeAndDislike
            className={`${view === 'list' ? 'mb-0' : ''}`}
            like={course?.likeCount}
            dislike={course?.dissLikeCount}
            view={view}
          />
        </div>
      </CardBody>

      {/* <CardFooter className="mb-2 flex flex-row items-center justify-between gap-2 dark:text-white lg:flex-col lg:items-start xl:flex-row xl:items-center xl:justify-between"></CardFooter> */}
    </NextUiCard>
  )
}
