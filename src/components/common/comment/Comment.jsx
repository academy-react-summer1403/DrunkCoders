import React, { useState } from 'react';
import { Button } from '@components';
import { useDisclosure } from '@nextui-org/react';
import { CommentModal } from './CommentModal';
import { CommentList } from './CommentList';
import { CommentWhite } from '@assets/index';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCourseComments, sendCourseComment } from '@core';


export function Comment({ courseId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalInput, setModalInput] = useState('');
  const [modalSubject, setModalSubject] = useState('');
  const [modalTitle, setModalTitle] = useState('نظر شما');
  const [isReply, setIsReply] = useState(false);
  const [replyToComment, setReplyToComment] = useState(null);

  const { data: comments, isLoading, error } = useQuery({
    queryKey: ['courseComments', courseId],
    queryFn: () => getCourseComments({ courseId }),
  });

  const mutation = useMutation({
    mutationFn: sendCourseComment,
    onSuccess: () => {
      setModalInput('');
      setModalSubject('');
      onOpen(false);
    },
  });

  function addCourseComment() {
    const payload = {
      courseId,
      title: modalSubject,
      describe: modalInput,
    };
    const formData = new FormData();
    formData.append('courseId', payload.courseId);
    formData.append('title', payload.title);
    formData.append('describe', payload.describe);
    mutation.mutate(formData);
  }

  function handleOpenModal(isOpen, comment = null, reply = false, addCourseReply) {
    setIsReply(reply);
    setReplyToComment(comment);
    setModalTitle(reply ? 'پاسخ شما' : 'نظر شما');
    onOpen(isOpen);
    setAddCourseReply(addCourseReply); 
  }

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Error loading comments</div>;

  return (
    <div className="comment-section rounded-3xl border-3 p-3 flex flex-col">
      <Button className="w-full text-lg" onPress={() => handleOpenModal(true)}>
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
        addCourseComment={addCourseComment}
        comments={comments}
        isReply={isReply}
        replyToComment={replyToComment}
      />

      <CommentList comments={comments} handleOpenModal={handleOpenModal} />
    </div>
  );
}

