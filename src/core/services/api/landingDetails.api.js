import { api } from '../interceptor'

export async function getLandingDetails({ signal }) {
  try {
    const response = await api.get('/Home/LandingReport', {
      //signal,
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
