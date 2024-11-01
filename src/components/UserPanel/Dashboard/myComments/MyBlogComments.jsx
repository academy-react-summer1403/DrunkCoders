import { DesignComment } from '@components/common/comments/DesignComment';
import { getMyNewsComments } from '@core/index';
import { Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { DashBlogComments } from './DashBlogComments';

export function MyBlogComments({userData}) {
  const { data:comments, error, isLoading, isError } = useQuery({
    queryKey: ['MyBlogComments'],
    queryFn: getMyNewsComments,
  });
  if (isLoading) return <Spinner size="lg" />;
  if (isError) return toast.error(error.message);
  console.log(comments);
  return (
    <div className = 'flex flex-col'>
      <p className='text-basic-gray'>اخبار و مقالات</p>
      {comments.length === 0 ? (
        <p className='text-basic-gray'>کامنتی وجود ندارد</p>
      ) : (
        comments.map((comment) => (
            <DashBlogComments key={comment.id}
            comment={comment}
            userData={userData}
            />
        ))
      )}
    </div>
  )
}
