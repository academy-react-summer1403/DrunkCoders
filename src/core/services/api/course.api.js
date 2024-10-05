import { api } from "../interceptor";

export async function getTopCourses({ count, signal }) {
  try {
    const response = await api.get("/Home/GetCoursesTop", {
      params: { count },
      signal,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
