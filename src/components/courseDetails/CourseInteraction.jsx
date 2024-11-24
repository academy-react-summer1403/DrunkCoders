import { IntractionDesigne } from '@components/common/detail/InteractionDesine';
import { addCourseFavorite, addDislikeForCourse, addLikeForCourse, removeCourseFavorite, removeCourseLikeOrDislike } from '@core/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export function CourseInteraction({course}) {
    const [likeState, setLikeState] = useState({ like: false, dislike: false });
    const [isBookmarked, setIsBookmarked] = useState(course.isUserFavorite);

    const courseId = course.courseId; 
    const queryClient = useQueryClient();
    const userLikeId = course.userLikeId;

    const { mutate : addCourseFavoriteMutate, isPending, isError } = 
    useMutation({
      mutationFn: () => addCourseFavorite({courseId}),
      onSuccess: (data) => {
        toast.success('به موارد دلخواه اضافه شد')
        queryClient.invalidateQueries(['courseDetails', data])
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  
    
    const setRemoveFavorite = useMutation({
      mutationFn:removeCourseFavorite,
      onSuccess: () => {
        toast.success(' از موارد دلخواه پاک شد')
        queryClient.invalidateQueries(['courseDetails']);
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
    function removeFavoriteCourse(){
      const payload = {
        favoriteId: course.userFavoriteId
      }
      const formData = new FormData();
      formData.append('CourseFavoriteId', payload.favoriteId);
  
      setRemoveFavorite.mutate(formData)
    }
  
  
    function handleBookmark() {
      setIsBookmarked((prevState) => {
        if (prevState) {
          removeFavoriteCourse();
        } else {
          addCourseFavoriteMutate();
        }
        return !prevState;
      });
    }
    useEffect(() => {
      // Set initial like and dislike state based on `currentUserLike` and `currentUserDissLike`
      setLikeState({
        like: course.currentUserLike === "1",
        dislike: course.currentUserDissLike === "1"
      });
    }, [course.currentUserLike, course.currentUserDissLike]);
    
    const { mutate: addCourseLike } = useMutation( {
      mutationFn: (courseId) => addLikeForCourse(courseId),
      onSuccess: () => {
        queryClient.invalidateQueries(['courseDetails']);
      }
    })
  
    const { mutate: addCourseDislike } = useMutation({
      mutationFn: (courseId) => addDislikeForCourse(courseId),
      onSuccess: () => {
        queryClient.invalidateQueries(['courseDetails']);
      }
    })
  
    const removeLikeDislike = useMutation({
      mutationFn: removeCourseLikeOrDislike,
      onSuccess: () => {
        queryClient.invalidateQueries(['courseDetails']);
      },
      onError: (error) => {
        console.log('Failed to remove like/dislike', error);
      },
    });
    
    function handleRemoveLikeDislike(userLikeId) {
      const formData = new FormData();
      formData.append('CourseLikeId', userLikeId);
    
      removeLikeDislike.mutate({ courseIdFormData: formData });
    }
    
  
    function handleLike(identifier) {
      if (identifier === "like") {
        if (likeState.like) {
          handleRemoveLikeDislike(userLikeId);
        } else {
          addCourseLike(courseId);
          if (likeState.dislike) handleRemoveLikeDislike(courseId);
        }
        setLikeState({ like: !likeState.like, dislike: false });
      } else if (identifier === "dislike") {
        if (likeState.dislike) {
          handleRemoveLikeDislike(userLikeId);
        } else {
          addCourseDislike(courseId);
          if (likeState.like) handleRemoveLikeDislike(userLikeId);
        }
        setLikeState({ like: false, dislike: !likeState.dislike });
      }
    }
  return (
    <IntractionDesigne
    isBookmarked={isBookmarked} 
    handleBookmark={handleBookmark} 
    likeState={likeState} 
    handleLike={handleLike} 
    likeCount={course.likeCount} 
    dislikeCount={course.dissLikeCount}
    />
  )
}
