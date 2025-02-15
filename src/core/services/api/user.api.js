import { api } from '../interceptor'

export async function getCurrentUserProfile() {
  try {
    const response = await api.get('/SharePanel/GetProfileInfo')
    return response
  } catch (error) {
    console.log(error)
    throw error
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
export async function getLatestCourses({ queryKey }) {
  const [, params] = queryKey

  try {
    const response = await api.get('/Home/GetCoursesWithPagination', {
      params,
    })

    return response
  } catch (error) {
    console.log(error)
  }
}

export async function changePassword(data) {
  try {
    const response = await api.post('/SharePanel/ChangePassword', data)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getAllMyCourses(params) {
  try {
    const response = await api.get('/SharePanel/GetMyCourses', {
      params,
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
export async function getCourseById(CourseId) {
  try {
    const response = await api.get('/Home/GetCourseDetails', {
      params: { CourseId },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getMyCoursesReserve() {
  try {
    const response = await api.get('/SharePanel/GetMyCoursesReserve')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getMyFavoriteNews() {
  try {
    const response = await api.get('/SharePanel/GetMyFavoriteNews')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getMyFavoriteCourses() {
  try {
    const response = await api.get('/SharePanel/GetMyFavoriteCourses')

    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getMyCoursesComments() {
  try {
    const response = await api.get('/SharePanel/GetMyCoursesComments')
    return response.myCommentsDtos
  } catch (error) {
    console.log(error)
  }
}

export async function getMyNewsComments() {
  try {
    const response = await api.get('/SharePanel/GetMyNewsComments')
    return response.myNewsCommetDtos
  } catch (error) {
    console.log(error)
  }
}

export async function editSecurity(data) {
  try {
    const response = await api.put('/SharePanel/EditSecurity', data)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getSecurityInfo() {
  try {
    const response = await api.get('/SharePanel/GetSecurityInfo')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function towStepVerification(code, data) {
  try {
    const response = await api.post(`Sign/LoginTwoStep?VrifyCode=${code}`, data)

    return response
  } catch (error) {
    console.error('Error in towStepVerification:', error)
  }
}

export async function coursePaymentFirstStep(data) {
  try {
    const response = await api.post('/CoursePayment', data)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getPaymentList() {
  try {
    const response = await api.get('/CoursePayment/StudentUserPayList')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getPaidCourse(paymentId) {
  try {
    const response = await api.get(`/CoursePayment/${paymentId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function paymentStep2(formData) {
  try {
    const response = await api.post('/CoursePayment/AddPeymentImage', formData)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function updatePayment(formData) {
  try {
    const response = await api.put('/CoursePayment', formData)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function deletePayment(formData) {
  try {
    const response = await api.delete('/CoursePayment', { data: formData })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getMultiUserProfile(token) {
  try {
    const response = await api.get('/SharePanel/GetProfileInfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Error fetching profile:', error)
    throw error
  }
}
