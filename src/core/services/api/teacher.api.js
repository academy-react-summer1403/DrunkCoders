import { api } from "../interceptor";

export async function getAllTeachers({ signal }) {
  try {
    const response = await api.get("/Home/GetTeachers", {
      signal,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
