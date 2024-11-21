import {
  MyCoursesAndArticlesLayout,
  MyFavArticlesRenderCells,
} from '@components/index'
import {
  getMyFavoriteNews,
  getNewsById,
  myFavArticlesColumns,
} from '@core/index'
import { useQueries, useQuery } from '@tanstack/react-query'

export function MyFavArticlesMain() {
  const { data } = useQuery({
    queryKey: ['myFavArticles'],
    queryFn: getMyFavoriteNews,
  })

  const ids = data ? data.myFavoriteNews.map((article) => article.newsId) : []

  let { data: detailedFavArticles } = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['single-favArticle', id],
      queryFn: () => getNewsById(id),
      enabled: Boolean(id),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data?.detailsNewsDto),
        //   pending: results.some((result) => result.isPending),
      }
    },
  })

  detailedFavArticles =
    detailedFavArticles.some((article) => article === undefined) ||
    detailedFavArticles.length === 0
      ? []
      : detailedFavArticles.map((article) => {
          article.courseName = article.title
          article.startDate = article.insertDate
          article.tumbImageAddress = article.currentImageAddressTumb
          article.technologyList = article.newsCatregoryName
          article.teacherName = article.addUserFullName
          return article
        })

  return (
    <MyCoursesAndArticlesLayout
      title="علاقه‌مندی مقالات"
      data={detailedFavArticles}
      renderCell={MyFavArticlesRenderCells}
      key={detailedFavArticles}
      onSort={null}
      sort={null}
      type="myFavArticles"
      headerColumns={myFavArticlesColumns}
    />
  )
}
