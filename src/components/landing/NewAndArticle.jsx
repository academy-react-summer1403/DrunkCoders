import { NewsCard, GridLayout } from '@components'
import { getWeekNews } from '@core'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { articleSortFilterActions } from '@store/index'

export function NewAndArticle() {
  // const dispatch = useDispatch()

  const queryKey = useMemo(
    () => [
      'news',
      {
        PageNumber: 1,
        RowsOfPage: 4,
        SortingCol: 'InsertDate',
        SortType: 'DESC',
      },
    ],
    [],
  )

  const { data, isSuccess } = useQuery({
    queryKey,
    queryFn: ({ signal }) => getWeekNews({ params: queryKey[1], signal }),
  })

  /*   useEffect(() => {
    if (isSuccess) {
      dispatch(articleSortFilterActions.setAll(queryKey))
    }
  }, [dispatch, isSuccess]) */

  return (
    <>
      {data && (
        <GridLayout
          title="اخبار و مقالات هفته"
          description="خبر ها و مقاله هایی که در این هفته منتشر شدند"
          card={NewsCard}
          dataArray={data.news}
          queryKey={queryKey}
        />
      )}
    </>
  )
}
