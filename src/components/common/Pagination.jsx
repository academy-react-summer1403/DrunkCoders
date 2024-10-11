import { Pagination as NextUiPagination } from '@nextui-org/react'
import { useState } from 'react'

export function Pagination() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <NextUiPagination
      isCompact
      showControls
      total={5}
      initialPage={1}
      page={currentPage}
      onChange={setCurrentPage}
      siblings={2}
    />
  )
}
