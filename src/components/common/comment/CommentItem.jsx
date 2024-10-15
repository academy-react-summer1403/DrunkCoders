import { useQuery } from '@tanstack/react-query';
import { getCourseCommentReplies } from '@core';
import { useEffect } from 'react';
import { Button } from '@components/index';
import { Accordion, AccordionItem, Avatar } from '@nextui-org/react';
import { CommentArrow } from '@assets/index';

export function CommentItem({ comment, handleOpenModal }) {
    
  // Fetch replies for the comment
  const { data: repliesData, isLoading: loadingReplies, error: repliesError } = useQuery({
    queryKey: ['commentReplies', comment.courseId, comment.id],
    queryFn: () => getCourseCommentReplies(comment.courseId, comment.id),
    enabled: !!comment.id, // Only fetch if comment.id is available
  });

  useEffect(() => {
    console.log('reply in CommentItem:', repliesData);
  }, [repliesData]);

  if (loadingReplies) return <div>Loading replies...</div>;
  if (repliesError) return <div>Error loading replies</div>;

  const finalReply = repliesData || []; // Use fetched replies if available

  return (
    <div className="comment mt-3 p-3">
      <div className='border-blue-600 border'>
        <div className="flex items-center gap-2">
          <Avatar src={comment.pictureAddress} size="lg" />
          <span>{comment.author}</span>
        </div>
        <div className="mr-8 mt-3 pb-12">
          <p>
            <strong>{comment.title}</strong>
          </p>
          <p className='mt-2'>{comment.describe}</p>
          <Button onPress={() => handleOpenModal(true, comment.id)} 
              className="-mr-1 mt-4 h-9 w-32 bg-blue-200 font-medium text-blue-600">
              <CommentArrow />
              جواب دادن
          </Button>
        </div>
      </div>

      {finalReply.length > 0 && (
        <Accordion isCompact className=' '
        itemClasses={
          {heading:'w-fit'}
        }>
          <AccordionItem title="مشاهده جواب‌ها ">
            <div className="replies mr-6 border-l pl-3">
              {repliesData.map((reply) => (
                <div className="reply p-2">
                  <div className="flex items-center gap-2">
                  <Avatar src={reply.pictureAddress} size="md" />
                    <span>{reply.author}</span>
                  </div>
                  <div className="mr-8">
                    <p>
                      <strong>{reply.title}</strong>
                    </p>
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
