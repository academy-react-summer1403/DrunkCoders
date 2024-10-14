import React, { useState } from 'react';
import { Button } from '@components';
import { useDisclosure } from '@nextui-org/react';
import { CommentModal } from './CommentModal';
import { CommentList } from './CommentList';
import { CommentWhite } from '@assets/index';
import { useQuery } from '@tanstack/react-query';
import { getCourseComments } from '@core';

export function Comment({ courseId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalInput, setModalInput] = useState('');
  const [modalSubject, setModalSubject] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [modalTitle, setModalTitle] = useState('نظر شما');

  const { data: comments, isLoading, error } = useQuery({
    queryKey: ['courseComments', courseId],
    queryFn: () => getCourseComments({ courseId }),
  });

  const handleAddComment = () => {
    if (modalInput.trim() === '' || modalSubject.trim() === '') return;
    const newComment = { id: Date.now(), subject: modalSubject, text: modalInput, replies: [] };
    // Since we're using local state for adding a new comment, you might want to mutate the query cache here later if needed
    setModalInput('');
    setModalSubject('');
    onOpenChange(false);
  };

  const handleAddReply = (commentId) => {
    if (modalInput.trim() === '' || modalSubject.trim() === '') return;
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            replies: [...comment.replies, { id: Date.now(), subject: modalSubject, text: modalInput }],
          }
        : comment
    );
    // Handle updating the local state here if needed
    setModalInput('');
    setModalSubject('');
    setReplyingTo(null);
    onOpenChange(false);
  };

  const handleSubmit = () => {
    if (replyingTo) {
      handleAddReply(replyingTo);
    } else {
      handleAddComment();
    }
  };

  const handleOpenModal = (isReply = false, commentId = null) => {
    if (isReply) {
      setReplyingTo(commentId);
      setModalTitle('پاسخ شما');
    } else {
      setReplyingTo(null);
      setModalTitle('نظر شما');
    }
    onOpen(true);
  };

  // Render loading, error, or comments based on query state
  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Error loading comments</div>;

  return (
    <div className="comment-section rounded-3xl border-3 p-3 flex flex-col">
      <Button className="w-full text-lg" onPress={() => handleOpenModal(false)}>
        <CommentWhite />
        نظر شما
      </Button>

      <CommentModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modalTitle={modalTitle}
        modalInput={modalInput}
        setModalInput={setModalInput}
        modalSubject={modalSubject}
        setModalSubject={setModalSubject}
        handleSubmit={handleSubmit}
        comments={comments}
        handleOpenModal={handleOpenModal}
      />

      <CommentList comments={comments} handleOpenModal={handleOpenModal} />
    </div>
  );
}
