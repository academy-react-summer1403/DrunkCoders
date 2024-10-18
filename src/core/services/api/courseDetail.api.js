import { api } from '../interceptor'


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
  
  
  export async function sendCourseComment(formData) {
    try {
      const response = await api.post('/Course/AddCommentCourse', formData);
      return response;
    } catch (error) {
      console.log('Error sending comment', error);
      throw error;
    }
  }
  
  export async function sendCourseReply(formData) {
    try {
      const response = await api.post('/Course/AddReplyCourseComment',formData)
      return response
    } catch (error) {
      console.log('Error sending comment', error);
      throw error;
    }
  }
  
  export async function rateCourse ({courseId , newRating}) {
      try {
        const response = await api.post(`/Course/SetCourseRating?CourseId=${courseId}&RateNumber=${newRating}`)
        return response;
      } catch (error) {
        console.log('Error sending comment', error.message);
        throw error;
      }
  }

  export async function reserveCourse ({ courseId }) {
    try {
        const response = await api.post('/CourseReserve/ReserveAdd',{ courseId })
        return response
    } catch (error) {
        console.log(error.ErrorMessage);
    }
  }

  export async function likeCourseComment ( commentId ){
    try {
        const response = await api.post(`/Course/AddCourseCommentLike?CourseCommandId=${commentId}`)
        return response;
    } catch (error) {
        console.log('course comment like ', error);
    }
  }

  export async function dislikeCourseComment ( commentId ) {
    try {
        const response = await api.post(`/Course/AddCourseCommentDissLike?CourseCommandId=${commentId}`)
        return response;
    } catch (error) {
        console.log('course comment dislike ', error);
    }
  }

  export async function addCourseFavorite ({ courseId }) {
    try {
        const response = await api.post('/Course/AddCourseFavorite', {courseId})
        return response;
    } catch (error) {
        console.log('course favorite', error);
    }
  }

  export async function removeCourseFavorite(formData) {
    try {
      const response = await api.delete('/Course/DeleteCourseFavorite', {data:formData});
      return response;
    } catch (error) {
      console.log('removeCourseFavorite', error);
    }
  }
  
  export async function getRelatedCourse(techId){
    try {
        const response = await api.get(`/Home/GetCoursesWithPagination?TechCount=1&ListTech=${techId}`)
        return response;
    } catch (error) {
        console.log('get related', error);
    }
  }

  export async function getCategory(){
    try {
        const response = await api.get('/Home/GetTechnologies')
        return response;
    } catch (error) {
        console.log('get category', error);
    }
  }