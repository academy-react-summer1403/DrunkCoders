import { CommentGray } from '@assets/index';
import { Button } from '@components/index';
import { getNewsComment, postNewsComment, postNewsReply } from '@core/index';
import { useDisclosure } from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ArticleCommentList } from './ArticleCommentList'; // Adjust this import as needed
import { CommentModal } from '@components/common/comments/CommentModal';

export function ArticleComments({ newsId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalInput, setModalInput] = useState('');
  const [modalSubject, setModalSubject] = useState('');
  const [modalTitle, setModalTitle] = useState('نظر شما');
  const [isReply, setIsReply] = useState(false);
  const [replyToComment, setReplyToComment] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);

  const { data: comments, isLoading, isError } = useQuery({
    queryKey: ['articleComments', newsId],
    queryFn: () => getNewsComment(newsId),
  });

  const handleOpenModal = (isOpen, comment = null, reply = false) => {
    setIsReply(reply);
    setReplyToComment(comment);
    setModalTitle(reply ? 'پاسخ شما' : 'نظر شما');
    onOpen(isOpen);
  };
  
  const mutation = useMutation({
    mutationFn: postNewsComment,
    onSuccess: () => {
      alert('Comment posted successfully!');
    },
    onError: (error) => {
      console.error('Error posting comment:', error);
    },
  });
  const commentData ={
    newsId:newsId,
    userIpAddress: '192.168.1.1',
    title:modalSubject,
    describe:modalInput,
    userId: '12345'
  }

  const handleCommentSubmit = (commentData) => {
    mutation.mutate(commentData);
    setModalInput(''); // Reset input field
    setModalSubject('');
  };

  const replyMutation = useMutation ({
    mutationFn: postNewsReply,
    onSuccess: () => {
      alert('Reply posted successfully!');
    },
    onError: (err) => {
      console.log('err', err);
    }
  })
  const replyData = {
    newsId:newsId,
    userIpAddress: "<string>",
    title:modalSubject,
    describe:modalInput,
    userId: "<long>",
    parentId: "<uuid>"
  }
  function handleReply (replyData){
    replyMutation.mutate(replyData)
    setModalInput('');
    setModalSubject('');
  }

  if (isLoading) return <p>Loading comments...</p>;
  if (isError || !comments) return <p>Error loading comments.</p>;
  console.log('reply to', replyToComment);

  return (
    <div className="comment-section rounded-3xl border-3 p-3 flex flex-col">
      {/* Button to open the modal for adding a new comment */}
      <Button className="w-full text-lg bg-gray-200 text-gray-500" onPress={() => handleOpenModal(true)}>
        <CommentGray />
        نظر شما
      </Button>

      {/* Modal for adding or replying to a comment */}
      <CommentModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modalTitle={modalTitle}
        modalInput={modalInput}
        setModalInput={setModalInput}
        modalSubject={modalSubject}
        setModalSubject={setModalSubject}
        addComment = {handleCommentSubmit}
        isReply={isReply}
        replyToComment={replyToComment}
        addReply={handleReply}
      >
        {comments.length > 0 ? (
          <ArticleCommentList comments={comments} handleOpenModal={handleOpenModal} />
        ) : (
          <p className="text-center text-gray-500">هیچ نظری وجود ندارد.</p>
        )}
      </CommentModal>

      {/* Display comments if they exist */}
      {comments.length > 0 ? (
        <>
          <ArticleCommentList comments={showAllComments ? comments : comments.slice(0, 2)} handleOpenModal={handleOpenModal} />

          {/* "Show more" and "Show less" buttons */}
          {comments.length > 2 && (
            <button
              className="w-full bg-gray-200 text-gray-500 p-2 rounded-3xl flex justify-center gap-2"
              onClick={() => setShowAllComments(!showAllComments)}
            >
              <CommentGray />
              {showAllComments ? 'نمایش کمتر' : 'نمایش بیشتر'}
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-400 text-2xl">کامنتی وجود ندارد</p>
      )}
    </div>
  );
}
