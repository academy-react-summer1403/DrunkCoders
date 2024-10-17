import { useMutation, useQuery } from '@tanstack/react-query';
import { getCourseCommentReplies,sendCourseReply } from '@core';
import { Button } from '@components/index';
import { Accordion, AccordionItem, Avatar, useDisclosure } from '@nextui-org/react';
import { CommentArrow } from '@assets/index';

export function CommentItem({ comment, handleOpenModal }) {


  const { data: repliesData, isLoading: loadingReplies, error: repliesError } = useQuery({
    queryKey: ['commentReplies', comment.courseId, comment.id],
    queryFn: () => getCourseCommentReplies(comment.courseId, comment.id),
    enabled: !!comment.id,
  });


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
          <div className='flex items-center gap-2'>
            <Button
              onPress={() => handleOpenModal(true, comment, true, )}
              className="-mr-1 mt-4 h-9 w-32 bg-blue-200 font-medium text-blue-600"
              >
              <CommentArrow />
              جواب دادن
            </Button>
            <div className='flex gap-2 items-center mt-4'>
              <div className='flex gap-1 items-center'>
                {comment.likeCount}
              </div>
              <div className='flex gap-1 items-center'>
                {comment.disslikeCount}
              </div>
            </div>
          </div>
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

    </div>
  );
}

