import { CommentGray } from '@assets/index';
import { Button } from '@components/index';
import { getNewsComment } from '@core/index';
import { useDisclosure } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ArticleCommentList } from './ArticleCommentList'; // Adjust the import based on your folder structure

export function ArticleComments({ newsId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalInput, setModalInput] = useState('');
  const [modalSubject, setModalSubject] = useState('');
  const [modalTitle, setModalTitle] = useState('نظر شما');
  const [isReply, setIsReply] = useState(false);
  const [replyToComment, setReplyToComment] = useState(null);

  const { data: comments, isLoading, isError } = useQuery({
    queryKey: ['articleComments', newsId],
    queryFn: () => getNewsComment(newsId),
  });
  console.log(comments);
  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (isError || !comments) {
    return <p>Error loading comments.</p>;
  }

  return (
    <div className="comment-section rounded-3xl border-3 p-3 flex flex-col">
      <Button className="w-full text-lg bg-gray-200 text-gray-500">
        <CommentGray />
        نظر شما
      </Button>
      <ArticleCommentList comments={comments} />
    </div>
  );
}
