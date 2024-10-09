import { Button } from '@components';
import {
  Modal,
  useDisclosure,
  ModalContent,
  ModalBody,
  Input
} from '@nextui-org/react';

export function CommentModal({ 
    isOpen, 
    onOpenChange, 
    modalTitle, 
    modalInput, 
    setModalInput, 
    modalSubject, 
    setModalSubject, 
    handleSubmit 
  }) {
    return (
      <Modal
        classNames={{
            closeButton: "hidden",
        }}
        className="w-[400px]"
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
          <ModalBody>
            <h3>{modalTitle}</h3>
            <Input
              label="موضوع"
              value={modalSubject}
              onChange={(e) => setModalSubject(e.target.value)}
              placeholder="موضوع خود را بنویسید"
              labelPlacement="outside"
            />
            <Input
              label="متن"
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              placeholder={modalTitle === 'پاسخ شما' ? 'پاسخ خود را بنویسید' : 'نظر خود را بنویسید'}
              labelPlacement="outside"
            />
            <Button type="submit" onPress={handleSubmit}>
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }