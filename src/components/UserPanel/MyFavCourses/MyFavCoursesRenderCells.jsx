import {
  BookDownload,
  Cancel,
  coursesFallback,
  Delete,
  HidePassword,
  ReservePanel,
} from '@assets/index'
import { PriceAndTomanLabel } from '@components/index'
import {
  convertGrigorianDateToJalaali,
  isValidUrl,
  removeCourseFavorite,
  reserveCourse,
} from '@core/index'
import { Image, Tooltip, useDisclosure } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { DelArtFavModal } from '../DelFavModal'

export function MyFavCoursesRenderCells({
  item,
  columnKey,
  onOpenSummaryModal,
}) {
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: reserveIsOpen,
    onOpen: reserveOnOpen,
    onOpenChange: reserveOnOpenChange,
  } = useDisclosure()
  // console.log(item);

  const { mutate: mutation, isPending } = useMutation({
    mutationFn: reserveCourse,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(' به لیست رزرو اضافه شد ')
        queryClient.invalidateQueries(['courseDetails'])
      } else {
        toast.error(data.response.data.ErrorMessage[0])
      }
    },
  })
  const {
    mutate: removeMutate,
    isPending: removePending,
    isError,
  } = useMutation({
    mutationFn: removeCourseFavorite,
    onSuccess: (data) => {
      console.log(data)
      if (data.success) {
        toast.success(' از موارد دلخواه پاک شد')
        queryClient.invalidateQueries(['myFavCourses'])
      } else {
        toast.error(data.response.data.ErrorMessage[0])
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const courseId = item.courseId
  function handleReserve() {
    console.log(item)
    mutation({ courseId })
  }
  function handleRemoveFav() {
    const formData = new FormData()
    formData.append('CourseFavoriteId', item.userFavoriteId)
    removeMutate(formData)
  }
  switch (columnKey) {
    case 'tumbImageAddress':
      return (
        <div className="h-16 w-24">
          <Image
            width="100%"
            height="100%"
            alt={item.courseName}
            src={
              isValidUrl(item.tumbImageAddress)
                ? item.tumbImageAddress
                : coursesFallback
            }
            isZoomed
            removeWrapper
            fallbackSrc={coursesFallback}
          />
        </div>
      )
    case 'title':
      return (
        <p className="text-md line-clamp-1 text-ellipsis font-medium lg:text-xl">
          {item.title}
        </p>
      )
    case 'teacherName':
      return <p className={`line-clamp-1 text-ellipsis`}>{item.teacherName}</p>
    case 'startTime':
      return <p>{convertGrigorianDateToJalaali(item.startTime)}</p>
    case 'cost':
      return <PriceAndTomanLabel price1={item.cost} tomanColor size="text-xl" />
    case 'actions':
      return (
        <div className="flexC gap-4 text-basic-gray">
          <Tooltip content="مشاهده">
            <span>
              <HidePassword
                onClick={() => onOpenSummaryModal(item)}
                className="cursor-pointer text-primary-blue transition-all"
              />
            </span>
          </Tooltip>

          <Tooltip content="رزرو">
            <span>
              <BookDownload
                onClick={reserveOnOpen}
                className="cursor-pointer text-primary-blue transition-all"
              />
            </span>
          </Tooltip>

          <Tooltip content="حذف">
            <span>
              <Cancel
                onClick={onOpen}
                className="cursor-pointer text-primary-blue transition-all"
              />
            </span>
          </Tooltip>
          <DelArtFavModal
            icon={<ReservePanel className="text-primary-blue" />}
            isOpen={reserveIsOpen}
            action={handleReserve}
            onClose={reserveOnOpenChange}
            isLoading={isPending}
            title="آیا از رزرو دوره مطمئن هستید؟"
            confirmClass="bg-primary-blue text-lg w-[70%]"
            content={
              <>
                <p className="text-basic-gray">
                  در صورت تایید دوره
                  <span className="font-bold text-primary-blue">
                    {' '}
                    {item.title}{' '}
                  </span>
                  به لیست رزرو دوره ها اضافه میشود تا ادمین ان را تایید کند
                </p>
              </>
            }
          />
          <DelArtFavModal
            icon={<Delete />}
            isOpen={isOpen}
            action={handleRemoveFav}
            onClose={onOpenChange}
            isLoading={removePending}
            title="آیا از حذف دوره مطمئن هستید؟"
            confirmClass="bg-red-400 text-lg w-[70%]"
            content={
              <>
                <p className="text-basic-gray">
                  در صورت تایید دوره
                  <span className="font-bold text-red-500"> {item.title} </span>
                  از لیست علاقه‌مندی دوره شما حذف خواهد شد
                </p>
              </>
            }
          />
        </div>
      )
    default:
      return null
  }
}
