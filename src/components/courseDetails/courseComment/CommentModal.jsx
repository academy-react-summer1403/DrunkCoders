import { Button } from '@components';
import { Cancel, Sent, Smile } from '@assets';
import {
  Modal,
  ModalContent,
  ModalBody,
  Input,
  ModalHeader,
  ModalFooter,
} from '@nextui-org/react';
import { CommentList } from './CommentList';
import { useState } from 'react';

export function CommentModal({
  isOpen,
  onOpenChange,
  modalTitle,
  modalInput,
  setModalInput,
  modalSubject,
  setModalSubject,
  addCourseComment,
  comments,
  handleOpenModal,
  isReply,
  replyToComment,
  addCourseReply
})

{
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  console.log( 'isReply',isReply);
  console.log('replyToComment', replyToComment);
  return (
    <Modal 
    scrollBehavior={scrollBehavior}
      classNames={{
        closeButton: 'absolute right-[794px] top-2 h-14 hover:hidden text-red-500 z-20 w-16 ',
      }}
      className="max-w-4xl dark:bg-gray-700"
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: 'easeOut' },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: { duration: 0.2, ease: 'easeIn' },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-evenly gap-[650px] relative">
              <h3 className="flex w-28 flex-row text-2xl">{modalTitle}📄</h3>
              <div className="flex h-10 w-24 rounded-full border-1 border-red-500 p-1 pr-4 text-center text-[14px] font-normal text-red-500 relative">
                <p className="absolute left-4">بستن</p>
              </div>
            </ModalHeader>

            <ModalBody>
              {comments.length > 0 ? (
                <CommentList comments={comments} handleOpenModal={handleOpenModal} />
              ) : (
                <p className="text-center text-gray-500">هیچ نظری وجود ندارد.</p>
              )}
            </ModalBody>

            <ModalFooter className="flex justify-start ">
              <Button
                type="submit"
                onClick={isReply ? addCourseReply : addCourseComment}
                className="relative top-5 h-16 p-0"
              >
                <Sent className="rounded-1xl h-8 w-8" />
              </Button>
              <div>
                {isReply && replyToComment && (
                  <div className="identify p-4 pb-8 -mb-5 bg-primary-blue text-white rounded-t-3xl flex justify-between">
                    <span>
                    پاسخ به {replyToComment.author}
                    </span>
                    <span className='cursor-pointer'  onClick={() => { /*isReply(false)*/ }}>
                      انصراف x
                    </span>
                  </div>
                )}
                <div className="w-[700px] rounded-3xl border p-2 bg-white">
                  <input
                    className="p-2 outline-none w-full"
                    label="موضوع"
                    value={modalSubject}
                    onChange={(e) => setModalSubject(e.target.value)}
                    placeholder="عنوان نظر خود را وارد کنید"
                    />
                  <hr />
                  <input
                    className="w- p-2 outline-none w-full"
                    label="متن"
                    value={modalInput}
                    onChange={(e) => setModalInput(e.target.value)}
                    placeholder={
                      modalTitle === 'پاسخ شما'
                      ? 'پاسخ خود را بنویسید'
                      : 'نظر خود را بنویسید'
                    }
                    />
                </div>
              </div>
              <div className="relative top-8 flex h-16 w-16 justify-center rounded-full border-1 border-gray-300">
                <Smile className="relative top-3.5" />
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}