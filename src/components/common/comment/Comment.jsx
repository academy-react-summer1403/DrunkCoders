import React, { useEffect, useState } from 'react';
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
  const [modalTitle, setModalTitle] = useState('نظر شما');

  const { data: comments, isLoading, error } = useQuery({
    queryKey: ['courseComments', courseId],
    queryFn: () => getCourseComments({ courseId }),
  });

  const handleSubmit = () => {
  };

  const handleOpenModal = () => {
    onOpen(true);
  };

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

      <CommentList
        comments={comments}
        handleOpenModal={handleOpenModal}
      />
    </div>
  );
}
