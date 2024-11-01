import { DesignComment } from '@components/common/comments/DesignComment'
import { getNewsReply } from '@core/index'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export function DashBlogComments({comment, userData}) {
    const { data:repliesData, isLoading, isError} = useQuery({
        queryKey:['comment', comment.id],
        queryFn: () => getNewsReply(comment.id),
    })
    const finalReplies = repliesData || [];

  return (
    <div >
    <DesignComment
      insertDate={comment.insertDate}
      finalReplies={finalReplies}
      pictureAddress={userData.currentPictureAddress}
      author='شما'
      title={comment.title}
      describe={comment.describe}
      comment
      likeCount={comment.likeCount}
      dislikeCount={comment.dislikeCount}
      handleLike
      likeState
      dash={true}
    />
  </div>
  )
}
