import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCourseCommentReplies, likeCourseComment, 
  dislikeCourseComment } from '@core';
import { useState } from 'react';
import { delCourseCommentLike } from '@core/index';
import { DesignComment } from '../../common/comments/DesignComment';

export function CommentItem({ comment, handleOpenModal }) {
  const [likeState, setLikeState] = useState({ like: false, dislike: false });
  const queryClient = useQueryClient();


  const { data: repliesData, isPending: loadingReplies, error: repliesError } = useQuery({
    queryKey: ['commentReplies', comment.courseId, comment.id],
    queryFn: () => getCourseCommentReplies(comment.courseId, comment.id),
    enabled: !!comment.id,
  });


  const { mutate: likeCourseCommentMutate, isPending: liking, isError: likeError } = 
  useMutation({
    mutationFn: () => likeCourseComment(comment.id),
    onSuccess: (data) => {
      console.log('Liked the comment successfully:', data);
      queryClient.invalidateQueries(['courseDetails', data])
    },
    onError: (error) => {
      console.error('Error liking the comment:', error);
    }
  });

  const { mutate: dislikeCourseCommentMutate, isPending: disliking, isError} =
  useMutation({
    mutationFn: () => dislikeCourseComment(comment.id),
    onSuccess: (data) => {
      console.log('Disslike the comment successfully:', data);
      queryClient.invalidateQueries(['courseDetails', data])
    },
    onError:(error) => {
      console.log('error dissliking the comment', error);
    }
  })

  const userLikeId = comment.currentUserLikeId
  const remCourseCommentLike = useMutation({
    mutationFn : () => delCourseCommentLike(userLikeId),
    onSuccess:() => {
        alert('comment like removed')
    },
    onError: (error) => {
        console.log('Error remove comment like ',error);
    }
  })

  function handleLike(identifier) {
    if (identifier === "like") {
      if (likeState.like) {
        remCourseCommentLike.mutate(); 
      } else {
        likeCourseCommentMutate(); 
      }
    } else {
      dislikeCourseCommentMutate();
    }
  
    setLikeState((prevState) =>
      identifier === "like"
        ? { like: !prevState.like, dislike: false }
        : { dislike: !prevState.dislike, like: false }
    );
  }
  

  if (loadingReplies) return <div>Loading replies...</div>;
  if (repliesError) return <div>Error loading replies</div>;

  const finalReplies = repliesData || [];
  // console.log(comment);

  return (
    <DesignComment
    finalReplies={finalReplies}
    pictureAddress={comment.pictureAddress}
    author={comment.author}
    title={comment.title}
    describe={comment.describe}
    comment={comment}
    likeCount={comment.likeCount}
    dislikeCount={comment.disslikeCount}
    handleOpenModal={handleOpenModal}
    handleLike={handleLike}
    likeState={likeState}
    />
  );
}
