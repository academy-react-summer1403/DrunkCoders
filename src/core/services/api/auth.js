import { api } from '../interceptor'

export const registerApi = async (user) => {
  try {
    const response = await api.post('/Sign/SendVerifyMessage', user)
    return response
  } catch (error) {
    console.log(error)
  }
}
export const verifyApi = async (user) => {
  try {
    const response = await api.post('/Sign/VerifyMessage', user)
    return response
  } catch (error) {
    console.log(error)
  }
}
export const registerFinalApi = async (user) => {
  try {
    const response = await api.post('/Sign/Register', user)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function loginUser(userData) {
  try {
    const response = await api.post('/Sign/Login', userData)

    return response
  } catch (error) {
    console.log(error)
  }
}

export async function forgetPassStep1Api(dataWithUrl) {
  try {
    const response = await api.post('/Sign/ForgetPassword', dataWithUrl)

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function forgetPassStep2Api({ configValue, signal }) {
  try {
    const response = await api.get('/Sign/Reset/' + configValue, { signal })

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function forgetPassStep3Api(newUserData) {
  try {
    const response = await api.post('/Sign/Reset', newUserData)

    return response
  } catch (error) {
    console.log(error)
  }
}
