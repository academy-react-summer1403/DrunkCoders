import { Button } from '@components'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { CommentArrow } from '@assets/index'

export function CommentItem({ comment, handleOpenModal }) {
  return (
    <div className="comment mt-3 p-3">
        <div className='border-blue-600 border'>
      <div className="flex items-center gap-2">
        <img src="" alt="" className="h-8 w-8 rounded-full bg-gray-200" />
        <span>user name</span>
      </div>
      <div className="mr-8 mt-3 pb-12">
        <p>
          <strong>{comment.subject}</strong>
        </p>
        <p className='mt-2'>{comment.text}</p>
        <Button onPress={() => handleOpenModal(true, comment.id)} 
            className="-mr-1 mt-4 h-9 w-32 bg-blue-200 font-medium text-blue-600">
                <CommentArrow/>
          جواب دادن
        </Button>
      </div>
</div>
      {comment.replies.length > 0 && (
        <Accordion isCompact>
          <AccordionItem title="مشاهده جواب‌ها ">
            <div className="replies mr-6 border-l pl-3">
              {comment.replies.map((reply) => (
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
                <CommentArrow/>
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
  )
}
