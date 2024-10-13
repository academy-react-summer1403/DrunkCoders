import { api } from '../interceptor'

export async function getTopCourses({ count, signal }) {
  try {
    const response = await api.get('/Home/GetCoursesTop', {
      params: { count },
      signal,
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function getCoursesWithPagination({ params, signal }) {
  try {
    const response = await api.get('/Home/GetCoursesWithPagination', {
      params,
      signal,
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
