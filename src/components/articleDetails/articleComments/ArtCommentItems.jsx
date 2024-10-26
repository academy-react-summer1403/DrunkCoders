import { DesignComment } from '@components/common/comments/DesignComment'
import { getNewsReply, postArticleCommentLike } from '@core/index'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

export function ArtCommentItems({comment,handleOpenModal}) {
    const [likeState, setLikeState] = useState({ like: false, dislike: false });
    const queryClient = useQueryClient();

    const { data:repliesData, isLoading, isError} = useQuery({
        queryKey:['comment', comment.id],
        queryFn: () => getNewsReply(comment.id),
    })

    const {mutate:addArtCommentLike, isPending, isError:errorLikeComment} = useMutation({
        mutationFn: () => postArticleCommentLike(comment.id),
        onSuccess: (data) =>{
            alert('liked comment');
            queryClient.invalidateQueries(['newsDetails',data])
        },
        onError:(err) =>{
            console.log('error like comment',err);
        }
    })

    function handleLike(identifier) {
        if (identifier === 'like'){
            addArtCommentLike()
        }
      
        setLikeState((prevState) =>
          identifier === "like"
            ? { like: !prevState.like, dislike: false }
            : { dislike: !prevState.dislike, like: false }
        );
      }
    if(isLoading)return <div>Loading replies...</div>
    const finalReplies = repliesData || [];
    console.log(comment);

  return (
    <>
        <DesignComment
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
