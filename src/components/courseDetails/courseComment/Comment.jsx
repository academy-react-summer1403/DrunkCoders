import React, { useState } from 'react';
import { Button } from '@components';
import { useDisclosure } from '@nextui-org/react';
import { CommentModal } from '../../common/comments/CommentModal';
import { CommentList } from './CommentList';
import { CommentBlack, CommentWhite } from '@assets/index';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCourseComments, sendCourseComment, sendCourseReply } from '@core';
import toast from 'react-hot-toast';

export function Comment({ courseId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalInput, setModalInput] = useState('');
  const [modalSubject, setModalSubject] = useState('');
  const [modalTitle, setModalTitle] = useState('نظر شما');
  const [isReply, setIsReply] = useState(false);
  const [replyToComment, setReplyToComment] = useState(null);
  
  const [showAllComments, setShowAllComments] = useState(false);

  const queryClient = useQueryClient();

  const { data: comments, isLoading, error } = useQuery({
    queryKey: ['courseComments', courseId],
    queryFn: () => getCourseComments({ courseId }),
  });

  const mutation = useMutation({
    mutationFn: sendCourseComment,
    onSuccess: (data) => {
      toast.success(' کامنت ارسال شد ')
      setModalInput('');
      setModalSubject('');
      onOpen(false);
      queryClient.invalidateQueries(['courseDetails', data]);
    },
    onError:(err) => {
      console.log('error', err);
    }
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
      toast.success(' پاسخ ارسال شد ');
      setModalInput('');
      setModalSubject('');
      onOpen(false);
      queryClient.invalidateQueries(['courseDetails', data]);
    },
    onError: (error) => {
      console.error('No response received:', error.message);
    },
  });

  function addCourseReply() {
    const payload = {
      courseId: replyToComment.courseId,
      title: modalSubject,
      describe: modalInput,
      commentId: replyToComment.id,
    };
    const formData = new FormData();
    formData.append('courseId', payload.courseId);
    formData.append('title', payload.title);
    formData.append('describe', payload.describe);
    formData.append('commentId', payload.commentId);

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
        addComment={addCourseComment}
        isReply={isReply}
        replyToComment={replyToComment}
        addReply={addCourseReply}
      >
          {comments.length > 0 ? (
            <CommentList comments={comments} handleOpenModal={handleOpenModal} />
          ) : (
            <p className="text-center text-gray-500">هیچ نظری وجود ندارد.</p>
          )}
      </CommentModal>
      

      {comments.length === 0 ? (
        <p className='text-gray-400 text-2xl'>
          کامنتی وجود ندارد
        </p>
      ) : (
        <div>
          <CommentList comments={showAllComments ? comments : comments.slice(0, 2)} handleOpenModal={handleOpenModal} />
          
          {comments.length > 2 && !showAllComments && (
            <button
              className="w-full bg-gray-200 text-black p-2 rounded-3xl flex justify-center gap-2"
              onClick={() => setShowAllComments(true)}
            >
              <CommentBlack/>
              نمایش بیشتر
            </button>
          )}
          
          {showAllComments && (
            <Button
              className="w-full bg-gray-200 text-black p-2"
              onClick={() => setShowAllComments(false)}
            >
              نمایش کمتر
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
