import { coursesFallback, HidePassword, Money } from '@assets/index'
import {
  convertGrigorianDateToJalaali,
  isValidUrl,
  myCoursesColumns,
} from '@core/index'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Tooltip,
  TableCell,
  Image,
  useDisclosure,
} from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { PriceAndTomanLabel } from '@components/index'
import { PaymentStep1 } from './PaymentStep1'

export function MyCoursesTable({ listOfMyCourses, onOpenSummaryModal }) {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth < 850 ? null : 'md',
  )
  const [selectedCourse, setSelectedCourse] = useState(null) // State for selected courseId

  console.log(listOfMyCourses)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setWindowWidth(width < 850 ? null : 'md')
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleOpenPaymentModal = (course) => {
    setSelectedCourse(course)
    onOpen() // Open the modal
  }

  const renderCell = useCallback(
    (course, columnKey) => {
      const cellValue = course[columnKey]

      switch (columnKey) {
        case 'tumbImageAddress':
          return (
            <div className="h-16 w-24">
              <Image
                width="100%"
                height="100%"
                alt={course.courseName}
                src={
                  isValidUrl(course.tumbImageAddress)
                    ? course.tumbImageAddress
                    : coursesFallback
                }
                isZoomed
                removeWrapper
                fallbackSrc={coursesFallback}
              />
            </div>
          )
        case 'courseTitle':
          return (
            <p className="text-md line-clamp-1 text-ellipsis font-medium lg:text-xl">
              {course.courseTitle}
            </p>
          )

        case 'fullName':
          return (
            <p className={`${windowWidth === null ? 'hidden' : 'block'}`}>
              {course.fullName}
            </p>
          )

        case 'lastUpdate':
          return <p>{convertGrigorianDateToJalaali(course.lastUpdate)} </p>

        case 'cost':
          return <PriceAndTomanLabel price1={course.cost} />

        case 'paymentStatus':
          return course.paymentStatus === 'پرداخت نشده' ? (
            <p>پرداخت نشده</p>
          ) : (
            'پرداخت شده'
          )
        case 'actions':
          return (
            <div className="flexC gap-4 text-basic-gray">
              <Tooltip content="مشاهده">
                <span>
                  <HidePassword
                    onClick={() => onOpenSummaryModal(course)}
                    className="cursor-pointer text-primary-blue transition-all"
                  />
                </span>
              </Tooltip>

              <Tooltip content="پرداخت">
                <span>
                  <Money
                    className="cursor-pointer text-primary-blue transition-all"
                    onClick={() => handleOpenPaymentModal(course)} // Pass courseId
                  />
                </span>
              </Tooltip>
            </div>
          )
        default:
          return cellValue
      }
    },
    [windowWidth],
  )

  return (
    <>
      <Table
        aria-label="Courses table"
        removeWrapper
        className="hidden rounded-2xl border-none md:block"
        classNames={{ th: 'text-base font-normal' }}
        color="primary"
        selectionMode="single"
      >
        <TableHeader>
          {myCoursesColumns.map((column) => (
            <TableColumn
              hideHeader={column.uid === 'fullName' && windowWidth === null}
              key={column.uid}
            >
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody emptyContent={'دوره‌ایی یافت نشد'}>
          {listOfMyCourses.map((course) => (
            <TableRow key={course.courseId}>
              {(columnKey) => (
                <TableCell className="w-8">
                  {renderCell(course, columnKey)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaymentStep1
        isOpen={isOpen}
        onClose={onOpenChange}
        course={selectedCourse || {}}
      />
    </>
  )
}
