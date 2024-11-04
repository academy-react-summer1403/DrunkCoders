import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
export function DataTable({
  tableHeader,
  tableBody,
  renderCell: RenderCell,
  windowWidth,
  onOpenSummaryModal,
}) {
  return (
    <Table
      aria-label="Courses table"
      removeWrapper
      className="hidden rounded-2xl border-none md:block"
      classNames={{ th: 'text-base font-normal' }}
      color="primary"
      selectionMode="single"
    >
      <TableHeader>
        {tableHeader.map((column) => (
          <TableColumn
            hideHeader={column.uid === 'fullName' && windowWidth === null}
            key={column.uid}
          >
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody emptyContent={'دوره‌ایی یافت نشد'}>
        {tableBody.map((item) => (
          <TableRow key={item.courseId}>
            {(columnKey) => (
              <TableCell className="w-8">
                <RenderCell
                  item={item}
                  columnKey={columnKey}
                  windowWidth={windowWidth}
                  onOpenSummaryModal={onOpenSummaryModal}
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
