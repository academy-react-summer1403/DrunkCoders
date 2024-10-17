import { useMutation, useQuery } from '@tanstack/react-query';
import { getCourseCommentReplies, likeCourseComment, 
  dislikeCourseComment } from '@core';
import { Button } from '@components/index';
import { Accordion, AccordionItem, Avatar, useDisclosure } from '@nextui-org/react';
import { CommentArrow, ThumbDown, ThumbUp } from '@assets/index';
import { useState } from 'react';

export function CommentItem({ comment, handleOpenModal }) {
  const [likeState, setLikeState] = useState({ like: false, dislike: false });

  const { data: repliesData, isLoading: loadingReplies, error: repliesError } = useQuery({
    queryKey: ['commentReplies', comment.courseId, comment.id],
    queryFn: () => getCourseCommentReplies(comment.courseId, comment.id),
    enabled: !!comment.id,
  });


  const { mutate: likeCourseCommentMutate, isLoading: liking, isError: likeError } = 
  useMutation({
    mutationFn: () => likeCourseComment(comment.id),
    onSuccess: (data) => {
      console.log('Liked the comment successfully:', data);
    },
    onError: (error) => {
      console.error('Error liking the comment:', error);
    }
  });

  const { mutate: dislikeCourseCommentMutate, isLoading: dissliking, isError} = 
  useMutation({
    mutationFn: () => dislikeCourseComment(comment.id),
    onSuccess: (data) => {
      console.log('Disslike the comment successfully:', data);
    },
    onError:(error) => {
      console.log('error dissliking the comment', error);
    }
  })

  function handleLike(identifier) {
    if (identifier === "like") {
      likeCourseCommentMutate(); 
    }else {
      dislikeCourseCommentMutate();
    }

    setLikeState((prevState) =>
      identifier === "like"
        ? { like: !prevState.like, dislike: false }
        : { dislike: !prevState.dislike, like: false }
    );
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
          <div className='flex items-center gap-16'>
            <Button
              onPress={() => handleOpenModal(true, comment, true)}
              className="-mr-1 mt-4 h-9 w-32 bg-blue-200 font-medium text-blue-600"
            >
              <CommentArrow />
              جواب دادن
            </Button>
            <div className='flex gap-8 items-center mt-4'>
              <div className='flex gap-1 items-center' 
              onClick={() => handleLike("like")}>
                <ThumbUp
                  className={`-mt-1 stroke-black dark:stroke-white hover:text-primary-blue
                    ${likeState.like ? "text-primary-blue stroke-primary-blue" : "text-transparent"}`}
                />
                {comment.likeCount}
              </div>
              <div className='flex gap-1 items-center'
              onClick={() => handleLike("dislike")}>
                <ThumbDown
                  className={`stroke-black dark:stroke-white hover:text-primary-blue
                    ${likeState.dislike ? "text-primary-blue stroke-primary-blue" : "text-transparent"}`}
                />
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
