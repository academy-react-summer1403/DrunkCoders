import { Button } from '@components';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { CommentArrow } from '@assets/index';
import { useEffect } from 'react';

export function CommentItem({ comment, handleOpenModal }) {
  const replies = comment.replies || [];
  useEffect(() => {
    console.log('Comment in CommentItem:', comment);
  }, [comment]); 

  return (
    <div className="comment mt-3 p-3">
      <div className='border-blue-600 border'>
        <div className="flex items-center gap-2">
          <img src={comment.pictureAddress} alt="" className="h-8 w-8 rounded-full bg-gray-200" />
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

      {replies.length > 0 && (
        <Accordion isCompact>
          <AccordionItem title="مشاهده جواب‌ها ">
            <div className="replies mr-6 border-l pl-3">
              {replies.map((reply) => (
                <div key={reply.id} className="reply p-2">
                  <div className="flex items-center gap-2">
                    <img
                      src=""
                      alt=""
                      className="h-8 w-8 rounded-full bg-gray-200"
                    />
                    <span>user name</span>
                  </div>
                  <div className="mr-8">
                    <p>
                      <strong>{reply.subject}</strong>
                    </p>
                    <p>{reply.text}</p>
                    <Button onPress={() => handleOpenModal(true, comment.id)} 
                        className="-mr-1 mt-4 h-9 w-32 bg-blue-200 font-medium text-blue-600">
                        <CommentArrow />
                        جواب دادن
                    </Button>
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
