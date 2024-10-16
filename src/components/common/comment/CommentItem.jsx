import { useMutation, useQuery } from '@tanstack/react-query';
import { getCourseCommentReplies,sendCourseReply } from '@core';
import { useEffect, useState } from 'react';
import { Button } from '@components/index';
import { Accordion, AccordionItem, Avatar, useDisclosure } from '@nextui-org/react';
import { CommentArrow } from '@assets/index';
import { CommentModal } from './CommentModal';

export function CommentItem({ comment, handleOpenModal }) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalInput, setModalInput] = useState('');
  const [modalSubject, setModalSubject] = useState('');

  const { data: repliesData, isLoading: loadingReplies, error: repliesError } = useQuery({
    queryKey: ['commentReplies', comment.courseId, comment.id],
    queryFn: () => getCourseCommentReplies(comment.courseId, comment.id),
    enabled: !!comment.id,
  });

  const setReply = useMutation({
    mutationFn: sendCourseReply,
    onSuccess: () => {
      alert('reply sent successfully');
      setModalInput('');
      setModalSubject('');
      onOpen(false);
    },
    onError: (error) => {
      console.error('No response received:', error.message);
    }
  });
  function addCourseReply() {
    const payload ={
      courseId: comment.courseId,
      title: modalSubject,
      describe: modalInput,
      commentId: comment.id
    };
    console.log(payload);
    const formData = new FormData();
    formData.append('courseId', payload.courseId);
    formData.append('title', payload.title);
    formData.append('describe', payload.describe);
    formData.append('commentId', payload.commentId)

    setReply.mutate(formData);
  }

  if (loadingReplies) return <div>Loading replies...</div>;
  if (repliesError) return <div>Error loading replies</div>;

  const finalReplies = repliesData || [];

  return (
    <div className="comment mt-3 p-3">
      <div className="border-blue-600 border">
        <div className="flex items-center gap-2">
          <Avatar src={comment.pictureAddress} size="lg" />
          <span>{comment.author}</span>
        </div>
        <div className="mr-8 mt-3 pb-12">
          <p><strong>{comment.title}</strong></p>
          <p className="mt-2">{comment.describe}</p>
          <Button
            onPress={() => handleOpenModal(true, comment, true, )}
            className="-mr-1 mt-4 h-9 w-32 bg-blue-200 font-medium text-blue-600"
          >
            <CommentArrow />
            جواب دادن
          </Button>
        </div>
      </div>

      {finalReplies.length > 0 && (
        <Accordion isCompact>
          <AccordionItem title="مشاهده جواب‌ها">
            <div className="replies mr-6 border-l pl-3">
              {finalReplies.map((reply) => (
                <div key={reply.id} className="reply p-2">
                  <div className="flex items-center gap-2">
                    <Avatar src={reply.pictureAddress} size="md" />
                    <span>{reply.author}</span>
                  </div>
                  <div className="mr-8">
                    <p><strong>{reply.title}</strong></p>
                    <p>{reply.describe}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionItem>
        </Accordion>
      )}
      <CommentModal
      addCourseReply={addCourseReply}
      />
    </div>
  );
}

