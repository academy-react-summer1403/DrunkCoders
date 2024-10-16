import { NewsCard, GridLayout } from '@components'
import { getWeekNews } from '@core'
import { useQuery } from '@tanstack/react-query'

export function NewAndArticle() {
  const params = {
    PageNumber: 1,
    RowsOfPage: 4,
    SortingCol: 'InsertDate',
    SortType: 'DESC',
  }

  const { data } = useQuery({
    queryKey: ['news', params],
    queryFn: ({ signal }) => getWeekNews({ params, signal }),
  })

  return (
    <>
      {data && (
        <GridLayout
          title="اخبار و مقالات هفته"
          description="خبر ها و مقاله هایی که در این هفته منتشر شدند"
          card={NewsCard}
          dataArray={data.news}
        />
      )}
    </>
  )
}
