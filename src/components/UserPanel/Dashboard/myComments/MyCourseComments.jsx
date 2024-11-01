import { DesignComment } from '@components/common/comments/DesignComment';
import { getMyCoursesComments } from '@core/index'
import { Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast';

export function MyCourseComments() {

  const { data:comments, error, isLoading, isError } = useQuery({
    queryKey: ['MyCourseComments'],
    queryFn: getMyCoursesComments,
  });
  if (isLoading) return <Spinner size="lg" />;
  if (isError) return toast.error(error.message);;
  console.log(comments);
  return (
    <div  className = 'flex flex-col'>
      <p className='text-gray-500'>دوره ها</p>
      {comments.length === 0 ? (
        <p>کامنتی وجود ندارد</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} >
            <DesignComment
              finalReplies
              pictureAddress
              author='شما'
              title={comment.title}
              describe={comment.describe}
              comment
              likeCount={comment.likeCount}
              dislikeCount={comment.dislikeCount}
              handleLike
              likeState
            />
          </div>
        ))
      )}
    </div>
  )
}
