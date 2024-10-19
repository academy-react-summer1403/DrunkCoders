import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@components'
import { getWeekNews } from '@core' // فرض می‌کنیم مسیر فایل api را درست داده‌اید
import { Calender, View, ThumbUp, ThumbDown, Bookmark } from '@assets'
import { useDisclosure } from '@nextui-org/react'

export function SideNews() {
  const [likeState, setLikeState] = useState({ like: false, dislike: false })
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // فراخوانی اخبار با useQuery
  const {
    data: news,
    isLoading,
    error,
  } = useQuery('weekNews', () =>
    getWeekNews({ params: { count: 10 } }).then((res) => {
      console.log('API Response:', res)
      return res
    }),
  )

  // مدیریت خطا
  if (error) return <p>خطا در بارگذاری اخبار.</p>

  // حالت بارگذاری
  if (isLoading) return <p>در حال بارگذاری اخبار...</p>

  // داده‌های شبیه‌سازی شده (به‌جای API)
  const item = [
    {
      id: '4f500022-853c-ef11-b6ca-c84ec5106ca4',
      title: 'راهنما آموزش',
      miniDescribe:
        'همانطور که از عنوان مقاله مشخص است، صحبت ما روی آموزش یک موضوع خاص مثل آموزش از کتاب',
      currentView: 48,
      addUserFullName: 'ساناز-زاهدی نسب',
      currentImageAddressTumb:
        'https://classapi.sepehracademy.ir/Pictures/NewsThumbnail/Screenshot (214)_806fc1c9-5037-400c-a751-848fc26efd93.png',
        insertDate: "2024-07-07T20:49:58.03",
        updateDate: "2024-10-14T00:35:35.34",
        addUserProfileImage: "https://classapi.sepehracademy.ir/\\Pictures\\ProfileImageThumbnail\\Loading2_98653a66-eb95-4230-92cc-494e20ec069f.jpg",
        newsCatregoryId: 14,
        newsCatregoryName: "دسته بندی تستی",
        currentUserIsLike: false,
        likeId: "00000000-0000-0000-0000-000000000000",
        isCurrentUserFavorite: false,
        currentUserFavoriteId: "00000000-0000-0000-0000-000000000000",
        currentUserSetRate: false,
        currentUserRateNumber: 0,
        currentUserIsDissLike: false,
        currentDissLikeCount: 48,
        isActive: true,
        totalCount: 0
    },
  ]

  const newsDataId = '4f500022-853c-ef11-b6ca-c84ec5106ca4'
  const dataItem = item.find((item) => item.id === newsDataId)

  // توابع لایک و دیسلایک
  function handleLike(identifier) {
    setLikeState((prevState) => ({
      like: identifier === 'like' ? !prevState.like : false,
      dislike: identifier === 'dislike' ? !prevState.dislike : false,
    }))
  }

  // تابع بوکمارک
  function handleBookmark() {
    setIsBookmarked((prevState) => !prevState)
  }

  return (
    <>
      {dataItem ? (
        <>
          <h1 className="mb-4 text-3xl font-medium">{dataItem.title}</h1>
          <div className="flex gap-2">          <Button className="mb-3 w-6 bg-[#5A7EFF] text-xs">مقاله</Button>
            <Button className="mb-3 w-24 bg-[#5A7EFF] p-1 px-2 text-xs">
              {dataItem.newsCatregoryName}
            </Button>
  
          </div>
          <div className="flex gap-2">
            <Calender />
            <p>20 اردیبهشت 1403</p>
          </div>
          <div className="flex gap-2">
            <View />
            <p>{dataItem.currentView} بازدید</p>
          </div>
          <p className="text-sm text-[#787878]"> منتشرکننده</p>
          <div className="flex gap-1 max-lg:flex-col  max-lg:gap-5 max-md:flex-row max-[400px]:flex-col ">
            <div className='flex gap-4'>
            <img
              src={dataItem.addUserProfileImage}
              alt="Thumbnail"
              className="h-12 w-12 rounded-full"
            />
            <p className="mt-3 w-40 whitespace-nowrap text-base">
              {dataItem.addUserFullName}
            </p>
            </div>

            <div className="  w-96 flex justify-end gap-3 max-[400px]:w-full max-lg:w-full max-[400px]:justify-center">

              <div
                className="mr- h-12 w-12 cursor-pointer rounded-full border-2 p-2.5"
                onClick={handleBookmark}
              >
                <Bookmark
                  className={`stroke-black hover:text-primary-blue dark:stroke-white ${isBookmarked ? 'stroke-primary-blue text-primary-blue' : 'text-transparent'}`}
                />
              </div>

              <div
                onClick={() => handleLike('like')}
                className="h-12 w-12 rounded-full border-2 p-2.5 pt-3"
              >
                <ThumbUp
                  className={`-mt-1 stroke-black hover:text-primary-blue dark:stroke-white ${likeState.like ? 'stroke-primary-blue text-primary-blue' : 'text-transparent'}`}
                />
              </div>

              <div
                onClick={() => handleLike('dislike')}
                className="h-12 w-12 rounded-full border-2 p-2.5"
              >
                <ThumbDown
                  className={`stroke-black hover:text-primary-blue dark:stroke-white ${likeState.dislike ? 'stroke-primary-blue text-primary-blue' : 'text-transparent'}`}
                />
              </div>
            </div>{' '}
          </div>
        </>
      ) : (
        <p>خبری با این ID پیدا نشد.</p>
      )}
    </>
  )
}
