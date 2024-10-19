import { NewsCard } from '@components/index'
import { getWeekNews } from '@core/index'
import { articleSortFilterActions } from '@store/article-sort-filter-slice'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function ArticleGrid() {
  const dispatch = useDispatch()
  const articleSaver = useRef()
  const {
    pagination,
    order,
    searchTerm,
    descendingOrder,
    category,
    dateRange,
  } = useSelector((state) => state.articleSort)

  const queryKey = useMemo(
    () => [
      'news',
      {
        PageNumber: pagination.currentPage,
        RowsOfPage: 9,
        SortingCol: order === '' ? null : order,
        SortType: descendingOrder ? 'DESC' : 'ASC',
        Query: searchTerm,
        NewsCategoryId: category,
        StartDate: dateRange.startDate,
        EndDate: dateRange.endDate,
      },
    ],
    [pagination, order, descendingOrder, searchTerm, category, dateRange],
  )

  let { data: news } = useQuery({
    queryKey,
    queryFn: ({ signal }) => getWeekNews({ params: queryKey[1], signal }),
  })

  if (news && dateRange.startDate) {
    const startDate = new Date(dateRange.startDate)
    const endDate = new Date(dateRange.endDate)

    const dateFilteredNews = news.news.filter((article) => {
      const articleDate = new Date(article.insertDate)

      if (articleDate <= endDate && articleDate >= startDate) return true
      else return false
    })

    news.news = dateFilteredNews
    news.totalCount = dateFilteredNews.length
  }

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
          {news.news.map((news) => (
            <NewsCard
              key={news.id}
              data={news}
              buttonColor={'#5A7EFF'}
              view="list"
              queryKey={queryKey}
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
