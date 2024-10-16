import { NewsCard } from '@components/index'
import { getWeekNews } from '@core/index'
import { articleSortFilterActions } from '@store/article-sort-filter-slice'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function ArticleGrid() {
  const dispatch = useDispatch()
  const { pagination, order, searchTerm, descendingOrder, category } =
    useSelector((state) => state.articleSort)

  const params = useMemo(
    () => ({
      PageNumber: pagination.currentPage,
      RowsOfPage: 9,
      SortingCol: order === '' ? null : order,
      SortType: descendingOrder ? 'DESC' : 'ASC',
      Query: searchTerm,
      NewsCategoryId: category,
    }),
    [pagination, order, descendingOrder, searchTerm, category],
  )

  const { data: news } = useQuery({
    queryKey: ['news', params],
    queryFn: ({ signal }) => getWeekNews({ params, signal }),
  })

  useEffect(() => {
    if (news) {
      dispatch(
        articleSortFilterActions.setTotalPageCount(
          Math.ceil(news.totalCount / 9),
        ),
      )
    }
  }, [news, dispatch])

  return (
    <>
      {news && (
        <div className={`mt-7 grid grid-cols-1 gap-4`}>
          {news.news.map((news, index) => (
            <NewsCard
              key={news.id}
              data={news}
              buttonColor={'#5A7EFF'}
              view="list"
              filterParams={params}
            />
          ))}
          {news.totalCount === 0 && (
            <div className="mx-auto mt-20">دیتایی وجود ندارد.</div>
          )}
        </div>
      )}
    </>
  )
}
