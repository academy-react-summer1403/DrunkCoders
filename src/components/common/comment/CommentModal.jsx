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
          <ModalBody>
            <h3>{modalTitle}</h3>

            <div className='border p-2 rounded-3xl'>
              <input className='p-2'
                label="موضوع"
                value={modalSubject}
                onChange={(e) => setModalSubject(e.target.value)}
                placeholder="عنوان نظر خود را وارد کنید"
                labelPlacement="outside"
              />
              <hr />
              <input className='p-2'
                label="متن"
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
                placeholder={modalTitle === 'پاسخ شما' ? 'پاسخ خود را بنویسید' : 'نظر خود را بنویسید'}
                labelPlacement="outside"
              />
            </div>
            
            <Button type="submit" onPress={handleSubmit}>
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }