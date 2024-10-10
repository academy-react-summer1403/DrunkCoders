import { Button } from '@components'
import { Accordion, AccordionItem } from '@nextui-org/react';
export function CommentItem({ comment, handleOpenModal }) {
    return (
      <div className="comment p-3">
        <div className='flex gap-2 items-center'>
            <img src="" alt="" className='rounded-full w-8 h-8 bg-gray-200' />
            <span>user name</span>
        </div>
        <div className='mr-8'>
        <p><strong>{comment.subject}</strong></p>
            <p>{comment.text}</p>
            <Button onPress={() => handleOpenModal(true, comment.id)}>جواب دادن</Button>
        </div>
  
        {comment.replies.length > 0 && (
        <Accordion isCompact>
            <AccordionItem  title="مشاهده جواب‌ها ">
                <div className="replies mr-6 border-l pl-3">
                    {comment.replies.map((reply) => (


                            <div key={reply.id} className="reply p-2">
                                <div className='flex gap-2 items-center'>
                                    <img src="" alt="" className='rounded-full w-8 h-8 bg-gray-200' />
                                    <span>user name</span>
                                </div>
                                <div className='mr-8'>
                                    <p><strong>{reply.subject}</strong></p>
                                    <p>{reply.text}</p>
                                    <Button onPress={() => handleOpenModal(true, comment.id)}>جواب دادن</Button>
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