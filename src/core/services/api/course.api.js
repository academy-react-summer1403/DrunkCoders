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

export async function getCoursesCategory() {
  try {
    const response = await api.get('/Home/GetTechnologies')
    return response
  } catch (error) {
    console.log(error)
  }
}
export async function getCoursesLevel() {
  try {
    const response = await api.get('/CourseLevel/GetAllCourseLevel')

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function addLikeForCourse(courseId) {
  console.log(courseId)
  try {
    const response = await api.post(
      '/Course/AddCourseLike',
      {},
      { params: { CourseId: courseId } },
    )

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function addDislikeForCourse(courseId) {
  try {
    const response = await api.post(
      '/Course/AddCourseDissLike',
      {},
      { params: { CourseId: courseId } },
    )

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function removeCourseLikeOrDislike(courseIdFormData) {
  try {
    const response = await api.delete('/Course/DeleteCourseLike', {
      data: courseIdFormData,
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
