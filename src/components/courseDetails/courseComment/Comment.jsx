import React, { useState } from 'react';
import { Button } from '@components';
import { useDisclosure } from '@nextui-org/react';
import { CommentModal } from './CommentModal';
import { CommentList } from './CommentList';
import { CommentWhite } from '@assets/index';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCourseComments, sendCourseComment, sendCourseReply } from '@core';


export function Comment({ courseId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalInput, setModalInput] = useState('');
  const [modalSubject, setModalSubject] = useState('');
  const [modalTitle, setModalTitle] = useState('نظر شما');
  const [isReply, setIsReply] = useState(false);
  const [replyToComment, setReplyToComment] = useState(null);

  const queryClient = useQueryClient();


  const { data: comments, isLoading, error } = useQuery({
    queryKey: ['courseComments', courseId],
    queryFn: () => getCourseComments({ courseId }),
  });

  const mutation = useMutation({
    mutationFn: sendCourseComment,
    onSuccess: (data) => {
      setModalInput('');
      setModalSubject('');
      onOpen(false);
      queryClient.invalidateQueries(['courseDetails', data])
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
  const setReply = useMutation({
    mutationFn: sendCourseReply,
    onSuccess: (data) => {
      alert('reply sent successfully');
      setModalInput('');
      setModalSubject('');
      onOpen(false);
      queryClient.invalidateQueries(['courseDetails', data])
    },
    onError: (error) => {
      console.error('No response received:', error.message);
    }
  });
  function addCourseReply() {
    const payload ={
      courseId: replyToComment.courseId,
      title: modalSubject,
      describe: modalInput,
      commentId: replyToComment.id
    };
    console.log(payload);
    const formData = new FormData();
    formData.append('courseId', payload.courseId);
    formData.append('title', payload.title);
    formData.append('describe', payload.describe);
    formData.append('commentId', payload.commentId)

    setReply.mutate(formData);
  }


  function handleOpenModal(isOpen, comment = null, reply = false) {
    setIsReply(reply);
    setReplyToComment(comment);
    setModalTitle(reply ? 'پاسخ شما' : 'نظر شما');
    onOpen(isOpen);
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
        addCourseReply={addCourseReply}
      />

      <CommentList comments={comments} handleOpenModal={handleOpenModal} />
    </div>
  );
}

