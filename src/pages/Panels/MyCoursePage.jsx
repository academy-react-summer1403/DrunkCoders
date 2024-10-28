import React, { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode' // تغییر به "jwt-decode" بدون import curly brackets
import { SearchBox, IconLabel } from '@components'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from '@nextui-org/react'
import { Search } from '@assets'
import { getAllMyCourses } from '@core'
import { JalaliDateRangePicker } from '@components/index'
import { Calendar2 } from '@assets/index'
import { useSelector } from 'react-redux'

export function MyCoursePage() {
  const [page, setPage] = useState(1)
  const rowsPerPage = 4
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })

  let token = useSelector((state) => state.token.users).find(
    (user) => user.isOnline === true,
  ).token

  // استفاده از useQuery برای گرفتن داده‌های دوره‌ها
  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['courses', searchTerm, page], // ایجاد کلید برای کوئری بر اساس searchTerm و page
    queryFn: () => {
      // ابتدا بررسی توکن
      if (!token) {
        throw new Error('No token found. User is not authenticated.')
      }

      // دیکد کردن توکن
      const decodedToken = jwtDecode(token)
      console.log('Decoded Token:', decodedToken) // لاگ کردن توکن دیکد شده

      const role =
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]
      console.log('User Role:', role) // لاگ کردن نقش کاربر

      // بررسی نقش کاربر
      if (!role || role !== 'Student') {
        throw new Error('Access denied: student role is required.')
      }

      // فراخوانی API با توکن و پارامترهای جستجو و صفحه‌بندی
      return getAllMyCourses(token, searchTerm, page, rowsPerPage).then(
        (data) => {
          console.log('Courses data received from API:', data) // لاگ کردن داده‌های دریافت شده
          return data
        },
      )
    },
    keepPreviousData: true, // نگه داشتن داده‌های قبلی تا زمان دریافت داده‌های جدید
  })

  // محاسبه تعداد صفحات
  const pages = Math.ceil(courses.length / rowsPerPage)

  // مدیریت جستجو

  // برش داده‌ها بر اساس صفحه
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return courses.slice(start, end)
  }, [page, courses])

  // بررسی وضعیت بارگذاری
  if (isLoading) return <Spinner />

  // بررسی ارور و نمایش آن
  if (error) return <p>Error fetching courses: {error.message}</p>

  function handleSearch(term) {
    setSearchTerm(term.trim())
  }

  // هندل تغییرات در تقویم
  function handleDateChange(startDate, endDate) {
    setDateRange({ startDate, endDate })
  }

  // هندل پاک کردن تقویم
  function handleClearCalender() {
    setDateRange({ startDate: null, endDate: null })
  }
  // رندر جدول دوره‌ها
  return (
    <>
      <h1 className="relative -top-0 mb-4 text-2xl font-medium">
        {' '}
        علاقه مندی مقالات
      </h1>
      <div className="relative top-1 flex gap-6">
        <SearchBox
          onSearch={handleSearch}
          label={<IconLabel icon={Search} label="جست‌جو اخبار با مقالات" />}
          placeholder="جستجوی دوره"
          className="mb-4 w-full rounded-md border-gray-300 p-2 text-sm md:w-1/3"
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

      <Table
        aria-label="Courses table"
        bottomContent={
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(newPage) => setPage(newPage)}
          />
        }
        classNames={{ wrapper: 'min-h-[222px]' }}
      >
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>نام دوره</TableColumn>
          <TableColumn>قیمت</TableColumn>
          <TableColumn>وضعیت پرداختی</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.courseTitle}>
              <TableCell>{item.courseTitle || 'نام دوره'}</TableCell>
              <TableCell>{item.cost} تومان</TableCell>
              <TableCell>{item.paymentStatus}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
