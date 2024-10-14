import { api } from '../interceptor'

export async function getTopCourses({ count, signal }) {
  try {
    const response = await api.get('/Home/GetCoursesTop', {
      params: { count },
      signal,
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function getCoursesWithPagination({ params, signal }) {
  try {
    const response = await api.get('/Home/GetCoursesWithPagination', {
      params,
      signal,
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
export async function getCourseDetails(id, { signal }) {
  try {
    const response = await api.get(`/Home/GetCourseDetails?`, {
      params: { CourseId: id },
      signal,
    });
    console.log("API Response:", response);
    return response; // Ensure you're returning the data
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw new Error("Could not fetch course details");
  }
}

export async function getCourseComments ({ courseId, signal }) {
  try {
    const response = await api.get(`/Course/GetCourseCommnets/${courseId}`, { signal });
    return response;
  } catch (error) {
    console.error('Error fetching course comments:', error);
    throw new Error('Could not fetch course comments');
  }
};

export async function getCourseCommentReplies(courseId, commentId, signal) {
  try {
    const response = await api.get(`/Course/GetCourseReplyCommnets/${courseId}/${commentId}`, { signal });
    return response;
  } catch (error) {
    console.error('Error fetching comment replies:', error);
    throw new Error('Could not fetch comment replies');
  }
};
