import { CommentGray } from '@assets/index';
import { Button } from '@components/index';
import { getNewsComment, postNewsComment, postNewsReply } from '@core/index';
import { useDisclosure } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { ArticleCommentList } from './ArticleCommentList'; // Adjust this import as needed
import { CommentModal } from '@components/common/comments/CommentModal';
import toast from 'react-hot-toast';

export function ArticleComments({ data}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalInput, setModalInput] = useState('');
  const [modalSubject, setModalSubject] = useState('');
  const [modalTitle, setModalTitle] = useState('نظر شما');
  const [isReply, setIsReply] = useState(false);
  const [replyToComment, setReplyToComment] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);

  const queryClient = useQueryClient();

  const newsId = data.id

  const { data: comments, isLoading, isError } = useQuery({
    queryKey: ['articleComments', newsId],
    queryFn: () => getNewsComment(newsId),
  });

  const handleOpenModal = (isOpen, comment = null, reply = false) => {
    setIsReply(reply);
    setReplyToComment(comment);
    onOpen(isOpen);
  };
  useEffect(() => {
    setModalTitle(isReply ? 'پاسخ شما' : 'نظر شما');
  }, [isReply]);
  
  const mutation = useMutation({
    mutationFn: postNewsComment,
    onSuccess: () => {
      toast.success('کامنت ارسال شد');
      queryClient.invalidateQueries(['newsDetails'])
    },
    onError: (error) => {
      console.error('Error posting comment:', error);
    },
  });

  const handleCommentSubmit = () => {
    const commentData = {
      newsId: newsId,
      userIpAddress: "192.168.1.1",
      title: modalSubject,
      describe: modalInput,
      userId: data.userId,
    };
    mutation.mutate(commentData);
    resetModalFields();
  };

  const replyMutation = useMutation ({
    mutationFn: postNewsReply,
    onSuccess: () => {
      toast.success('پاسخ شما ارسال شد');
      queryClient.invalidateQueries(['newsDetails'])
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const handleReply = () => {
    const replyData = {
      newsId: newsId,
      userIpAddress: "192.168.1.1",
      title: modalSubject,
      describe: modalInput,
      userId: data.userId,  
      parentId: replyToComment?.parentId,
    };
    replyMutation.mutate(replyData);
    resetModalFields();
  };
  function resetModalFields() {
    setModalInput('');
    setModalSubject('');
  }

  if (isLoading) return <p>Loading comments...</p>;
  if (isError || !comments) return <p>Error loading comments.</p>;
  
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
        setIsReply={setIsReply}
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
