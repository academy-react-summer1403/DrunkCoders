import { api } from "../interceptor";

export async function getWeekNews({ params, signal }) {
  try {
    const response = await api.get("/News", {
      params: params,
      signal,
    });

    return response.news;
  } catch (error) {
    console.log(error);
  }
}
