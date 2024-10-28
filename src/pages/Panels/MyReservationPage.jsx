import React, { useState, useCallback } from 'react'
import { Avatar, Pagination } from '@nextui-org/react'
import { SearchBox, JalaliDateRangePicker, IconLabel } from '@components' // کامپوننت‌های جستجو و انتخاب تاریخ
import { Calendar2, Search, View } from '@assets'
import { Link } from 'react-router-dom'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from '@nextui-org/react'
import { ReservationSort } from './ReservationSort'
import { LikeAndDislike, ModalCloseBtn } from '@components/index'
import { Button } from '@components/index'
import { Calender, StarIcon, Student } from '@assets/index'
const columns = [
  { name: ' #', uid: 'tumbImageAddress' }, // اصلاح ستون‌ها برای مطابقت با داده‌ها

  { name: ' نام دوره', uid: 'courseName' }, // اصلاح ستون‌ها برای مطابقت با داده‌ها

  { name: ' استاد دوره', uid: 'teacherName' }, // اصلاح ستون‌ها برای مطابقت با داده‌ها

  { name: 'شروع دوره', uid: 'lastUpdate' }, // اصلاح ستون‌ها برای مطابقت با داده‌ها
  { name: 'قیمت دوره', uid: 'cost' },
  { name: 'وضعیت ثبت نام', uid: 'accept' }, // تغییر 'status' به 'accept'
  { name: '', uid: 'actions' },
]

const reservations = [
  {
    reserveId: 'eabcb0e3-3a91-ef11-b6e6-82fc07f68400',
    courseId: 'be071479-2131-ef11-b6c8-c6ea51a59bbe',
    courseName: 'asasas',
    studentId: 10145,
    studentName: 'مهدی اصغری',
    reserverDate: '2024-10-23T16:02:39.57',
    accept: false,
  },
  {
    reserveId: '682500be-d22f-ef11-b6c7-cc06a3e06235',
    courseId: '0ed74730-9012-ef11-b6c2-f4b229435c5d',
    courseName: 'دوره آموزش مقدماتی NextJs',
    studentId: 10145,
    studentName: 'مهدی اصغری',
    reserverDate: '2024-06-21T17:02:45.907',
    accept: true,
  },
  {
    reserveId: '959a2f2a-5c89-ef11-b6df-efca7ebaba3a',
    courseId: 'e87dc2da-fa3e-ef11-b6ca-c84ec5106ca4',
    courseName: 'تبابتینابیتات',
    studentId: 10145,
    studentName: 'مهدی اصغری',
    reserverDate: '2024-10-13T15:40:41.953',
    accept: true,
  },
]

const statusColorMap = {
  true: 'success', // 'accept' به true یا false تبدیل شد
  false: 'danger',
}

export function MyReservationPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })

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

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 4

  const pages = Math.ceil(reservations.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return reservations.slice(start, end)
  }, [page, reservations])

  const renderCell = useCallback((reservation, columnKey) => {
    const cellValue = reservation[columnKey]

    switch (columnKey) {
      case 'tumbImageAddress':
        return (
          <img
            src=""
            alt=""
            className="h-16 w-24 rounded-md border-2 border-[#D9D9D9] bg-[#D9D9D9]"
          />
        )
      case 'courseName':
        return <p>{reservation.courseName} </p>

      case 'teacherName':
        return <p className="text-sm font-medium">{cellValue}</p> // بازگرداندن کلاس

      case 'lastUpdate':
        return <p>{reservation.lastUpdate} </p>

      case 'cost':
        return <p>{reservation.cost} تومان </p>

      case 'accept': // وضعیت رزرو
        return (
          <Chip
            className="capitalize" // بازگرداندن کلاس
            color={statusColorMap[reservation.accept]}
            size="sm"
            variant="flat"
          >
            {reservation.accept ? 'تأیید شده' : 'تأیید نشده'}
          </Chip>
        )
      case 'actions':
        return (
          <Tooltip content="Details">
            <span></span>
          </Tooltip>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <>
      <h1 className="relative -top-2 mb-4 text-2xl font-medium">رزرو من</h1>

      <div className="flex gap-6">
        <SearchBox
          onSearch={handleSearch}
          label={<IconLabel icon={Search} label="جست‌جو دوره" />}
          placeholder="جستجوی دوره"
          className="mb-4 w-full rounded-md border-gray-300 p-2 md:w-1/3"
        />
        <div className="mt-2 w-72">
          <JalaliDateRangePicker
            label={<IconLabel icon={Calendar2} label="تاریخ برگزاری" />}
            onChange={handleDateChange}
            onClear={handleClearCalender}
            prevDate={[dateRange.startDate, dateRange.endDate]}
            className="mb-4 rounded-md border border-gray-300 p-2"
          />
        </div>
        <ReservationSort />
      </div>

      <div className="overflow-x-auto">
        <Table
          aria-label="Example table with client async pagination"
          bottomContent={
            pages > 0 ? (
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            ) : null
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={reservations}>
            {(item) => (
              <TableRow key={item.reserveId}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
