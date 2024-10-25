import { api } from '../interceptor'

export async function getCurrentUserProfile() {
  try {
    const response = await api.get('/SharePanel/GetProfileInfo')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function EditUserProfile(userFormData) {
  try {
    const response = await api.put(
      '/SharePanel/UpdateProfileInfo',
      userFormData,
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function selectProfilePic(picIdFormData) {
  try {
    const response = await api.post(
      '/SharePanel/SelectProfileImage',
      picIdFormData,
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
export async function addProfilePic(picFormData) {
  try {
    const response = await api.post('/SharePanel/AddProfileImage', picFormData)
    return response
  } catch (error) {
    console.log(error)
  }
}
export async function deleteProfilePic(picIdFormData) {
  try {
    const response = await api.delete('/SharePanel/DeleteProfileImage', {
      data: picIdFormData,
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
