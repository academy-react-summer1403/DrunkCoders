import { api } from '../interceptor'

export async function getCurrentUserProfile() {
  try {
    const response = await api.get('/SharePanel/GetProfileInfo')
    return response
  } catch (error) {
    console.log(error)
  }
}
