import { DesignComment } from '@components/common/comments/DesignComment'
import { deleteArticleCommentLike, getNewsReply, postArticleCommentLike } from '@core/index'
import { postNewsComment } from '@core/services/api/newsDetails.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export function ArtCommentItems({comment,handleOpenModal}) {
    const [likeState, setLikeState] = useState({ like: comment.currentUserIsLike, dislike: comment.currentUserIsDissLike });
    const queryClient = useQueryClient();

    const { data:repliesData, isLoading, isError} = useQuery({
        queryKey:['comment', comment.id],
        queryFn: () => getNewsReply(comment.id),
    })

    const {mutate:addArtCommentLike, isPending, isError:errorLikeComment} = useMutation({
        mutationFn: () => postArticleCommentLike(comment.id),
        onSuccess: (data) =>{
            alert('liked comment');
            queryClient.invalidateQueries(['articleComments',data])
        },
        onError:(err) =>{
          toast.error(' کامنت لایک نشد ')
        }
    })

    const delCommentLike = useMutation({
      mutationFn: (deleteEntityId) => deleteArticleCommentLike(deleteEntityId),
      onSuccess: (data) => {
        queryClient.invalidateQueries(['articleComments',data])
      },
      onError: (err) => {
        toast.error(' کامنت دیسلایک نشد ')
      }
    })

    function handleLike(identifier) {
        if (likeState.like) {
          delCommentLike.mutate(userLikeId);
      } else {
          addArtCommentLike();
      }
      
        setLikeState((prevState) =>
          identifier === "like"
            ? { like: !prevState.like, dislike: false }
            : { dislike: !prevState.dislike, like: false }
        );
      }

    if(isLoading)return <div>Loading replies...</div>
    const finalReplies = repliesData || [];
    const userLikeId = comment.currentUserLikeId;
  return (
    <>
        <DesignComment
        insertDate={comment.insertDate}
        finalReplies={finalReplies}
        likeState={likeState}
        pictureAddress={comment.pictureAddress}
        author={comment.autor}
        describe={comment.describe}
        comment={comment}
        likeCount={comment.likeCount}
        dislikeCount={comment.dissLikeCount}
        handleLike={handleLike}
        handleOpenModal={handleOpenModal}
        />
    </>
  )
}
