import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../app/App'

export function useArticleLikeAndDislikeUpdate(
  mutationFn,
  queryKey,
  identifier,
) {
  const userLikeStatus = {
    currentUserIsLike: identifier === 'like' ? true : false,
    currentUserIsDissLike: identifier === 'dislike' ? true : false,
  }
  return useMutation({
    mutationFn,
    onMutate: async (articleId) => {
      await queryClient.cancelQueries(queryKey) // canceling outgoing refetch
      const prevArticles = queryClient.getQueryData(queryKey) // copy prev course data
      queryClient.setQueryData(queryKey, (oldArticles) => {
        const updatedArticles = oldArticles?.news.map((article) =>
          article.id ===
          (identifier === 'remove' ? articleId.articleId : articleId)
            ? { ...article, ...userLikeStatus }
            : article,
        )
        // console.log(updatedArticles)
        return {
          totalCount: oldArticles.totalCount,
          news: updatedArticles,
        }
      })
      return { prevArticles }
    },
    onError: (err, articleId, context) => {
      console.log(err)
      queryClient.setQueryData(queryKey, context.prevArticles)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}
