import React, { useState } from 'react';
import { Button } from '@components';

import {
  useDisclosure,
} from '@nextui-org/react';
import { CommentModal } from './CommentModal';
import { CommentList } from './ComentList';

export function Comment() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [comments, setComments] = useState([]);
  const [modalInput, setModalInput] = useState('');
  const [modalSubject, setModalSubject] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [modalTitle, setModalTitle] = useState('نظر شما');

  const handleAddComment = () => {
    if (modalInput.trim() === '' || modalSubject.trim() === '') return;
    const comment = { id: Date.now(), subject: modalSubject, text: modalInput, replies: [] };
    setComments([...comments, comment]);
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
            replies: [...comment.replies, { id: Date.now(), subject: modalSubject, text: modalInput, replies: [] }],
          }
        : comment
    );
    setComments(updatedComments);
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

  return (
    <div className="comment-section rounded-3xl border-3 p-3 flex flex-col">
      <Button className="w-full" onPress={() => handleOpenModal(false)}>
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
      />

      <CommentList comments={comments} handleOpenModal={handleOpenModal} />
    </div>
  );
}
