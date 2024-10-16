import { Pagination as NextUiPagination } from '@nextui-org/react'
import { sortFilterActions } from '@store/sort-filter-slice'
import { useDispatch, useSelector } from 'react-redux'

export function Pagination() {
  const dispatch = useDispatch()
  const { currentPage, totalPageCount } = useSelector(
    (state) => state.sort.pagination,
  )

  function handleChange(pageNumber) {
    dispatch(sortFilterActions.setCurrentPage(pageNumber))
  }

  return (
    <NextUiPagination
      size="lg"
      isCompact
      showControls
      total={totalPageCount}
      initialPage={1}
      page={currentPage}
      onChange={handleChange}
      siblings={2}
    />
  )
}
