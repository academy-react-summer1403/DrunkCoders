import { api } from '../interceptor'

export async function getAllTeachers() {
  try {
    const response = await api.get('/Home/GetTeachers')

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function getTeacherById(TeacherId) {
  try {
    const response = await api.get('/Home/GetTeacherDetails', {
      params: { TeacherId },
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
