import { Button } from '@components';
import { Cancel, Sent, Smile } from '@assets';
import { Modal, ModalContent, ModalBody, Input, ModalHeader, ModalFooter } from '@nextui-org/react';
import { CommentList } from './CommentList';
import { ReplySection } from './ReplySection';
import { useState } from 'react';
import { CommentModalFooter } from './CommentModalFooter';
import { CommentModalHeader } from './CommentModalHeader';

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
}) {
  const [scrollBehavior, setScrollBehavior] = useState("inside");

  return (
    <Modal
      scrollBehavior={scrollBehavior}
      className="max-w-4xl dark:bg-gray-700"
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <CommentModalHeader modalTitle={modalTitle} onClose={onClose} />
            <ModalBody>
              {comments.length > 0 ? (
                <CommentList comments={comments} handleOpenModal={handleOpenModal} />
              ) : (
                <p className="text-center text-gray-500">هیچ نظری وجود ندارد.</p>
              )}
            </ModalBody>
            <CommentModalFooter
              isReply={isReply}
              addCourseComment={addCourseComment}
              addCourseReply={addCourseReply}
              modalInput={modalInput}
              setModalInput={setModalInput}
              modalSubject={modalSubject}
              setModalSubject={setModalSubject}
              replyToComment={replyToComment}
            />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}