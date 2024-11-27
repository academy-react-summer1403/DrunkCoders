import { articleFallback, Cancel, HidePassword } from '@assets/index'

import { convertGrigorianDateToJalaali, delNewsFavorite, isValidUrl } from '@core/index'
import { Image, Tooltip, useDisclosure } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { DelArtFavModal } from '../DelFavModal';

export function MyFavArticlesRenderCells({
  item,
  columnKey,
  onOpenSummaryModal,
}) {
  const queryClient = useQueryClient();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const { mutate: delFavNews, isPending } = useMutation({
    mutationFn: (deleteEntityId) => delNewsFavorite(deleteEntityId),
    onSuccess: (data) => {
      console.log(data);
      if(data.message=== "عملیات با موفقیت انجام شد."){
        toast.success(' از موارد دلخواه پاک شد');
        queryClient.invalidateQueries(['myFavArticles']);
      }else{
        toast.error(data.response.data.ErrorMessage[0])
      }
    },
  });
  function handleDel(){
    delFavNews(item.currentUserFavoriteId)
  }
  //   console.log(data)
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
                : articleFallback
            }
            isZoomed
            removeWrapper
            fallbackSrc={articleFallback}
          />
        </div>
      )
    case 'title':
      return (
        <p className="text-md line-clamp-1 text-ellipsis font-medium lg:text-xl">
          {item.title}
        </p>
      )
    case 'about':
      return <p className={`line-clamp-1 text-ellipsis`}>{item.miniDescribe}</p>
    case 'insertDate':
      return <p>{convertGrigorianDateToJalaali(item.insertDate)}</p>
    case 'userName':
      return <p>{item.addUserFullName}</p>
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

          <Tooltip content="حذف">
            <span>
              <Cancel
                onClick={onOpen}
                className="cursor-pointer text-primary-blue transition-all"
              />
            </span>
          </Tooltip>
          <DelArtFavModal
            isOpen={isOpen}
            action={handleDel}
            onClose={onOpenChange}
            isLoading={isPending}
            title='حذف علاقه مندی'
            content= {<span className='font-bold text-red-500'> {item.title} </span>}
          />
        </div>
      )
    default:
      return null
  }
}
