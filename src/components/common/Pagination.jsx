import { Pagination as NextUiPagination } from '@nextui-org/react'

export function Pagination({ currentPage, totalPageCount, onChange }) {
  return (
    <NextUiPagination
      size="lg"
      isCompact
      showControls
      total={totalPageCount}
      initialPage={1}
      page={currentPage}
      onChange={onChange}
      siblings={1}
    />
  )
}
