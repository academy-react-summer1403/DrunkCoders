import {
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  User,
} from '@nextui-org/react'
import {
  Button,
  CardHeader,
  DateAndStudentNumber,
  LikeAndDislike,
  ModalCloseBtn,
  PriceAndTomanLabel,
  TitleAndStarIcon,
  TitleDescription,
  CircularProgressAndLabel,
} from '@components/index'
import { useQuery } from '@tanstack/react-query'
import { getCourseById, getTeacherById } from '@core/index'
import { Link } from 'react-router-dom'

export function SummaryModal({ isOpen, onOpenChange, title, data, type }) {
  const { data: course } = useQuery({
    queryKey: ['single-course', data.courseId],
    queryFn: () => getCourseById(data.courseId),
    enabled: type !== 'myFavArticles',
  })

  const { data: teacher } = useQuery({
    queryKey: ['single-teacher', course?.teacherId],
    queryFn: () => getTeacherById(course?.teacherId || data.teacherId),
    enabled: Boolean(course?.teacherId),
  })

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      scrollBehavior="inside"
      isDismissable={false}
      size="lg"
      className={`rounded-[24px] pb-3`}
      classNames={{ body: 'no-scrollbar' }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between gap-1">
              <p className="text-xl font-medium">{title}</p>

              <ModalCloseBtn onClose={onClose} />
            </ModalHeader>

            <ModalBody className="flex flex-col gap-6">
              <div className={`relative h-[220px] w-full`}>
                <CardHeader
                  data={data}
                  buttonColor="#5A7EFF"
                  type={type === 'myFavArticles' ? null : 'course'}
                />
              </div>

              <div className="flex items-center justify-between">
                <Button
                  as={Link}
                  to={'/courses/' + data.courseId}
                  className="px-6 py-4 text-base font-medium"
                >
                  {type === 'myFavArticles' ? 'صفحه مقاله' : 'صفحه دوره'}
                </Button>
                {
                  <LikeAndDislike
                    circle
                    userLikeStatus={{
                      like: course?.currentUserLike,
                      dislike: course?.currentUserDissLike,
                    }}
                    //onLikeAndDislike={handleLikeAndDislike}
                  />
                }
              </div>

              <TitleDescription
                title={type === 'myFavArticles' ? 'عنوان' : 'نام دوره'}
              >
                <TitleAndStarIcon
                  title={data.courseTitle || data.courseName}
                  rate={course?.currentRate ?? 0}
                />
              </TitleDescription>

              {(type === 'myReservations' || type === 'myFavCourses') && (
                <TitleDescription title="وضعیت ثبت نام">
                  {type === 'myReservations' && (
                    <Chip
                      color={data.accept ? 'success' : 'danger'}
                      size="sm"
                      variant="flat"
                    >
                      {data.accept ? 'تأیید شده' : 'تأیید نشده'}
                    </Chip>
                  )}
                  {type === 'myFavCourses' && (
                    <div>
                      {data.accept ? (
                        <Chip color="success" size="sm" variant="flat">
                          تأیید شده
                        </Chip>
                      ) : (
                        <Button className="px-4 py-3 text-base font-medium">
                          رزرو دوره
                        </Button>
                      )}
                    </div>
                  )}
                </TitleDescription>
              )}

              {type === 'myCourses' && (
                <TitleDescription title="وضعیت پرداختی">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CircularProgressAndLabel
                      value={data.paymentStatus === 'پرداخت نشده' ? 0 : 70}
                      classNames={{ svg: 'h-[72px] w-[72px]' }}
                    />

                    <PriceAndTomanLabel
                      price1={data.cost}
                      price2="1500000"
                      tomanColor
                      className="text-[28px]"
                    />
                  </div>
                </TitleDescription>
              )}

              <TitleDescription
                title={
                  type === 'myFavArticles'
                    ? 'درباره اخبار یا مقاله'
                    : 'توضیح مختصر'
                }
              >
                <p className="line-clamp-2 text-ellipsis">
                  {course?.miniDescribe || data.miniDescribe}
                </p>
              </TitleDescription>

              <TitleDescription title="مدرس دوره">
                <User
                  name={data.teacherName || data.fullName}
                  description="سنیور فرانت اند"
                  classNames={{
                    wrapper: '',
                    name: 'mb-2 -mt-1 text-xl font-medium',
                    description: 'dark:text-white/60 text-sm font-thin',
                  }}
                  avatarProps={{
                    size: 'lg',
                    src: teacher?.pictureAddress,
                  }}
                />
              </TitleDescription>

              <div className="flex justify-between">
                <DateAndStudentNumber
                  capacity={course?.capacity}
                  currentRegistrants={course?.currentRegistrants}
                  startDate={course?.startTime || data.startDate}
                  endDate={course?.endTime}
                  type={type}
                  views={data.currentView}
                />

                {(type === 'myReservations' || type === 'myFavCourses') && (
                  <PriceAndTomanLabel
                    price1={data.cost}
                    tomanColor
                    className="self-end text-[28px]"
                  />
                )}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
