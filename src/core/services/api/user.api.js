import { api } from '../interceptor'
import { setLocalStorage, getLocalStroge } from '@core' // مسیر صحیح توابع

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

export async function getAllMyCourses(
  token,
  searchTerm = '',
  page = 1,
  rowsPerPage = 10,
) {
  try {
    const response = await api.get('/SharePanel/GetMyCourses', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        PageNumber: page,
        RowsOfPage: rowsPerPage,
        SortingCol: 'DESC',
        SortType: 'LastUpdate',
        Query: searchTerm,
      },
    })

    if (response.data && response.data.listOfMyCourses) {
      console.log(
        'Courses data received from API:',
        response.data.listOfMyCourses,
      ) // نمایش داده‌ها در کنسول
      return response.data.listOfMyCourses // بازگشت لیست دوره‌ها
    } else {
      console.log('No courses data found. Returning empty array.')
      return [] // بازگشت یک آرایه خالی
    }
  } catch (error) {
    console.error('Error fetching courses:', error)
    return [] // بازگشت آرایه خالی در صورت بروز خطا
  }
}

export async function GetMyCoursesReserve(reserveId, courseId) {
  const token = localStorage.getItem('token') // دریافت توکن از localStorage
  if (!token) {
    console.log('توکن یافت نشد')
    return null
  }

  try {
    const response = await api.get(
      `/SharePanel/GetMyCoursesReserve?ReserveId=${reserveId}&CourseId=${courseId}`,
      {
        Authorization: `Bearer ${token}`, // اضافه کردن توکن به هدر
      },
    )

    if (response.status === 200) {
      console.log('داده‌ها با موفقیت دریافت شد', response.data)
      return response.data // بازگرداندن داده‌ها
    } else {
      console.log('خطا در دریافت داده‌ها')
      return null
    }
  } catch (error) {
    console.log('خطا در دریافت داده‌ها از API', error)
    return null
  }
}

export async function getMyFavoriteNews({ params }) {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No token found. User is not authenticated.')
      throw new Error('No token found. User is not authenticated.')
    }

    console.log('Token successfully retrieved:', token)

    const response = await api.get('/SharePanel/GetMyFavoriteNews', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    console.log('API Response:', response.data)

    return response.data || { myFavoriteNews: [], totalCount: 0 } // اطمینان از بازگرداندن مقدار پیش‌فرض
  } catch (error) {
    console.error(
      'Error fetching favorite news:',
      error.response?.data || error.message,
    )
    return { myFavoriteNews: [], totalCount: 0 } // مقدار پیش‌فرض در صورت خطا
  }
}

export async function getMyFavoriteCourses({ params }) {
  try {
    const response = await api.get('/SharePanel/GetMyFavoriteCourses', {
      params,
      //signal,
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
