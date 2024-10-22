import { api } from '../interceptor'

export async function getCurrentUserProfile() {
  try {
    const response = await api.get('/SharePanel/GetProfileInfo')
    return response
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getLatestCourses() {
  try {
      const response = await api.get('/Home/GetCoursesWithPagination?RowsOfPage=20&SortingCol=InsertDate&SortType=DESC')
      return response
  } catch (error) {
      console.log(error);
      throw error;
  }
}