import { DesignComment } from '@components/common/comments/DesignComment';
import { getCourseCommentReplies, getMyCoursesComments } from '@core/index'
import { Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast';
import { DashCourseComments } from './DashCourseComments';
// import {getCourseCommentReplies} 

export function MyCourseComments({userData}) {

  const { data:comments, error, isLoading, isError } = useQuery({
    queryKey: ['MyCourseComments'],
    queryFn: getMyCoursesComments,
  });


  if (isLoading) return <Spinner size="lg" />;
  if (isError) return toast.error(error.message);;
  return (
    <div  className = 'flex flex-col'>
      <p className='text-gray-500'>دوره ها</p>
      {comments.length === 0 ? (
        <p className='text-gray-500'>کامنتی وجود ندارد</p>
      ) : (
        comments.map((comment) => (
          <DashCourseComments key={comment.id} comment={comment}
           userData={userData}/>
        ))
      )}
    </div>
  )
}
