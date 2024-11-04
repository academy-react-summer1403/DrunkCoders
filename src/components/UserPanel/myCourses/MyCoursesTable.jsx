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
} from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { PriceAndTomanLabel } from '@components/index'

export function MyCoursesTable({ listOfMyCourses, onOpenSummaryModal }) {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth < 850 ? null : 'md',
  )

  useEffect(() => {
    window.addEventListener('resize', () => {
      const width = window.innerWidth
      if (width < 850) {
        setWindowWidth(null)
      } else {
        setWindowWidth('md')
      }
    })
  }, [])

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
            <p className="text-md font-medium lg:text-xl">
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
            ''
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
                  <Money className="cursor-pointer text-primary-blue transition-all" />
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
    </>
  )
}
