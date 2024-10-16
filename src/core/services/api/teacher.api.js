import { api } from '../interceptor'

export async function getAllTeachers() {
  try {
    const response = await api.get('/Home/GetTeachers')

    return response
  } catch (error) {
    console.log(error)
  }
}
