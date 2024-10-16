import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../app/App'

export function useArticleLikeAndDislikeUpdate(
  mutationFn,
  filterParams,
  identifier,
) {
  const userLikeStatus = {
    currentUserIsLike: identifier === 'like' ? true : false,
    currentUserIsDissLike: identifier === 'dislike' ? true : false,
  }
  return useMutation({
    mutationFn,
    onMutate: async (articleId) => {
      await queryClient.cancelQueries(['news', filterParams]) // canceling outgoing refetch
      const prevArticles = queryClient.getQueryData(['news', filterParams]) // copy prev course data
      queryClient.setQueryData(['news', filterParams], (oldArticles) => {
        const updatedArticles = oldArticles?.news.map((article) =>
          article.id ===
          (identifier === 'remove' ? articleId.articleId : articleId)
            ? { ...article, ...userLikeStatus }
            : article,
        )
        console.log(updatedArticles)
        return {
          totalCount: oldArticles.totalCount,
          news: updatedArticles,
        }
      })
      return { prevArticles }
    },
    onError: (err, articleId, context) => {
      console.log(err)
      queryClient.setQueryData(['news', filterParams], context.prevArticles)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['news', filterParams])
    },
  })
}
