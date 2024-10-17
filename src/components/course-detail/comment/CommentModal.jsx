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

export function CommentModal({
  isOpen,
  onOpenChange,
  modalTitle,
  modalInput,
  setModalInput,
  modalSubject,
  setModalSubject,
  handleSubmit,
  comments,          // Pass comments as a prop
  handleOpenModal,
}) {
  return (
    <Modal
      classNames={{
        closeButton: 'absolute right-[794px] top-2 h-14 hover:hidden text-red-500  z-20   w-16 ',
      }}
      className="max-w-4xl"
      backdrop="transparent"
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
              {/* Conditionally render comments or a fallback message */}
              {comments.length > 0 ? (
                <CommentList comments={comments} handleOpenModal={handleOpenModal} />
              ) : (
                <p className="text-center text-gray-500">هیچ نظری وجود ندارد.</p>
              )}
            </ModalBody>

            <ModalFooter className="flex justify-start ">
              <Button
                type="submit"
                onPress={handleSubmit}
                className="relative top-5 h-16 p-0"
              >
                <Sent className="rounded-1xl h-8 w-8" />
              </Button>
              <div className="w-[700px] rounded-3xl border p-2">
                <input
                  className="p-2 outline-none"
                  label="موضوع"
                  value={modalSubject}
                  onChange={(e) => setModalSubject(e.target.value)}
                  placeholder="عنوان نظر خود را وارد کنید"
                />
                <hr />
                <input
                  className="w- p-2 outline-none"
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
