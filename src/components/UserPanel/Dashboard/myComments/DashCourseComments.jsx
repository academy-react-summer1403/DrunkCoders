import { DesignComment } from '@components/common/comments/DesignComment'
import { getCourseCommentReplies } from '@core/index';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export function DashCourseComments({comment,userData}) {
    const { data: repliesData, isPending: loadingReplies, error: repliesError } = useQuery({
        queryKey: ['commentReplies', comment.courseId, comment.id],
        queryFn: () => getCourseCommentReplies(comment.courseId, comment.id),
        enabled: !!comment.id,
      });
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
