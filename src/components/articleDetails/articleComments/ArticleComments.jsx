import { CommentGray } from '@assets/index';
import { Button } from '@components/index';
import { getNewsComment } from '@core/index';
import { useDisclosure } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ArticleCommentList } from './ArticleCommentList'; // Adjust the import based on your folder structure
import { CommentBlack } from '@assets/index'; // Ensure this is imported correctly
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

  console.log(comments);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (isError || !comments) {
    return <p>Error loading comments.</p>;
  }
  function handleOpenModal(isOpen, comment = null, reply = false) {
    setIsReply(reply);
    setReplyToComment(comment);
    setModalTitle(reply ? 'پاسخ شما' : 'نظر شما');
    onOpen(isOpen);
  }

  return (
    <div className="comment-section rounded-3xl border-3 p-3 flex flex-col">
      <Button className="w-full text-lg bg-gray-200 text-gray-500" onPress={() => handleOpenModal(true)}>
        <CommentGray />
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
        addComment
        isReply={isReply}
        replyToComment={replyToComment}
        addReply
      >
        { comments.length > 0 ?(
          <ArticleCommentList comments={comments} handleOpenModal={handleOpenModal} />
        ) : (
          <p className="text-center text-gray-500">هیچ نظری وجود ندارد.</p>
        )}
      </CommentModal>

      {comments.length === 0 ? (
        <p className='text-gray-400 text-2xl'>کامنتی وجود ندارد</p>
      ) : (
        <>
          <ArticleCommentList comments={showAllComments ? comments : comments.slice(0, 2)} />

          {comments.length > 2 && !showAllComments && (
            <button
              className="w-full bg-gray-200 text-gray-500 p-2 rounded-3xl flex justify-center gap-2"
              onClick={() => setShowAllComments(true)}
            >
              <CommentGray />
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
        </>
      )}
    </div>
  );
}
