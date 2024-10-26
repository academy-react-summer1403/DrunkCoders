import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
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
  addComment,
  isReply,
  replyToComment,
  addReply,
  children
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
                {children}

            </ModalBody>
            <CommentModalFooter
              isReply={isReply}
              addComment={addComment}
              addReply={addReply}
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