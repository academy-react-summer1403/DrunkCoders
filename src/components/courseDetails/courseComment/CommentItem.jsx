import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCourseCommentReplies, likeCourseComment, 
  dislikeCourseComment } from '@core';
import { useState } from 'react';
import { delCourseCommentLike } from '@core/index';
import { DesignComment } from '../../common/comments/DesignComment';
import toast from 'react-hot-toast';

export function CommentItem({ comment, handleOpenModal }) {
  const [likeState, setLikeState] = useState({
    like: comment.currentUserEmotion === 'LIKED',
    dislike: comment.currentUserEmotion === 'DISSLIKED'
  });
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
      queryClient.invalidateQueries(['courseComments'])
    },
    onError: () => {
      toast.error(' کامنت شما ارسال نشد ')
    }
  });

  const { mutate: dislikeCourseCommentMutate, isPending: disliking, isError} =
  useMutation({
    mutationFn: () => dislikeCourseComment(comment.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['courseComments'])
    },
    onError:(error) => {
      console.log('error dissliking the comment', error);
    }
  })

  const userLikeId = comment.currentUserLikeId
  const remCourseCommentLike = useMutation({
    mutationFn : () => delCourseCommentLike(userLikeId),
    onSuccess:() => {
      queryClient.invalidateQueries(['courseComments'])
    },
    onError: (error) => {
      toast.error(error.message)
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
    insertDate={comment.insertDate}
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
