import { Pagination as NextUiPagination } from '@nextui-org/react'
import { useState } from 'react'

export function Pagination() {
  const [currentPage, setCurrentPage] = useState(1)

  function handleChange(e) {}

  return (
    <NextUiPagination
      size="lg"
      isCompact
      showControls
      total={5}
      initialPage={1}
      page={currentPage}
      onChange={handleChange}
      siblings={2}
    />
  )
}
