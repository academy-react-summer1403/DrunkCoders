import { api } from '../interceptor'

//get all news with pagination
export async function getWeekNews({ params, signal }) {
  try {
    const response = await api.get('/News', {
      params: params,
      signal,
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function getNewsCategories() {
  try {
    const response = await api.get('/News/GetListNewsCategory')

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function addLikeForArticle(articleId) {
  try {
    const response = await api.post('/News/NewsLike/' + articleId)

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function addDislikeForArticle(articleId) {
  try {
    const response = await api.post('/News/NewsDissLike/' + articleId)

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function removeArticleLikeOrDislike({ likeId }) {
  const object = { deleteEntityId: likeId }
  try {
    const response = await api.delete('/News/DeleteLikeNews', { data: object })
    return response
  } catch (error) {
    console.log(error)
  }
}
