import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

function onSuccess(response) {
  return response.data;
}

function onError(error) {
  return handleError(error);
}

api.interceptors.response.use(onSuccess, onError);
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return handleError(error);
  },
);

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Response Error:", error.response.data);
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);

    // Handle specific status codes
    switch (error.response.status) {
      case 401:
        alert("Unauthorized! Please log in again.");
        localStorage.removeItem("token");
        window.location.pathname = "/auth";
        break;
      case 403:
        alert("Forbidden! You don’t have permission to access this resource.");
        break;
      case 404:
        alert("Not Found! The requested resource was not found.");
        break;
      case 500:
        alert("Internal Server Error! Please try again later.");
        break;

      default:
        if (error.response.status >= 400 && error.response.status < 500) {
          // Handle all other 4xx errors
          alert("A client error occurred! Status: " + error.response.status);
        } else if (
          error.response.status >= 500 &&
          error.response.status < 600
        ) {
          // Handle all other 5xx errors
          alert("A server error occurred! Status: " + error.response.status);
        }
        break;
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Request Error:", error.request);
    alert("Network error! Please check your internet connection.");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error:", error.message);
    alert("An unexpected error occurred. Please try again.");
  }
  return Promise.reject(error); // Reject the promise to keep the error flowing
};
