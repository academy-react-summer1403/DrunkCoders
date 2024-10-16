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
