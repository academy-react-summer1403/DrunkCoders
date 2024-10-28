import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from '@nextui-org/react'
import { getMyFavoriteNews } from '@core'
import { SearchBox, JalaliDateRangePicker, IconLabel } from '@components'
import { Calendar2, Search } from '@assets'
import { View } from '@assets/index'

export function FavoriteArticles() {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })

  // دریافت داده‌ها از API با توجه به جستجو و تاریخ
  const {
    data = { myFavoriteNews: [] },
    error,
    isLoading,
  } = useQuery({
    queryKey: ['favoriteNews', searchTerm, dateRange],
    queryFn: () => {
      console.log('در حال ارسال درخواست به API...') // نشان دادن شروع درخواست
      return getMyFavoriteNews({
        params: {
          searchTerm,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
      })
    },
    onSuccess: (data) => {
      console.log('داده‌ها با موفقیت دریافت شدند:', data) // نشان دادن داده‌های دریافتی
    },
    onError: (error) => {
      console.error('خطا در دریافت داده‌ها:', error) // نشان دادن خطا در صورت وجود
    },
  })

  // مدیریت جستجو
  function handleSearch(term) {
    setSearchTerm(term.trim())
  }

  // مدیریت تغییرات تاریخ
  function handleDateChange(startDate, endDate) {
    setDateRange({ startDate, endDate })
  }

  // پاک کردن تاریخ
  function handleClearCalender() {
    setDateRange({ startDate: null, endDate: null })
  }

  // مدیریت حالت بارگذاری و خطا
  if (isLoading) {
    console.log('در حال بارگذاری داده‌ها...') // نشان دادن در حال بارگذاری
    return <Spinner />
  }

  if (error) {
    return `خطا در دریافت اخبار: ${error.message}`
  }

  const favoriteNews = data.myFavoriteNews || []

  return (
    <>
      <h1 className="relative -top-0 mb-4 text-2xl font-medium">
        {' '}
        علاقه مندی مقالات
      </h1>
      <div className="flex gap-6 relative top-1">
        <SearchBox
          onSearch={handleSearch}
          label={<IconLabel icon={Search} label="جست‌جو اخبار با مقالات" />}
          placeholder="جستجوی دوره"
          className="mb-4 w-full text-sm rounded-md border-gray-300 p-2 md:w-1/3"
        />
        <div className="mt-2 w-72">
          <JalaliDateRangePicker
            label={<IconLabel icon={Calendar2} label="تاریخ انتشار" />}
            onChange={handleDateChange}
            onClear={handleClearCalender}
            prevDate={[dateRange.startDate, dateRange.endDate]}
            className="mb-4 rounded-md border border-gray-300 p-2"
          />
        </div>{' '}
      </div>

      <Table>
        <TableHeader>
                <TableColumn>#</TableColumn>
    
          <TableColumn>عنوان</TableColumn>
          <TableColumn>درباره مقاله</TableColumn>
          <TableColumn>منتشرکننده </TableColumn>
          <TableColumn> تاریخ انتشار</TableColumn>
                    <TableColumn>   </TableColumn>

        </TableHeader>
        <TableBody>
          {favoriteNews.map((article) => (
            <TableRow key={article.newsId}>
              <TableCell>
                <img
                  src={article.currentImageAddressTumb}
                  alt={article.title}
                  width={100}
                />
              </TableCell>              
              <TableCell>{article.title || "ریکت جی اس"}</TableCell>
            <TableCell> </TableCell>
              <TableCell>
                {new Date(article.updateDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <View/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
