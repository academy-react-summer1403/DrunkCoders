import React from 'react';
import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
import { ArrowDot, CoursePro, UserStory } from '@assets';
import { Button } from '@components';

export function ReserveModal({ isOpen, onOpenChange }) {
  return (
    <Modal
      hideCloseButton
      className='w-[400px]'
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}
    >
      <ModalContent>
        {
          (onClose) => (
            <>
              <ModalBody>
                <div className='flex flex-col rounded-3xl bg-white relative gap-6'>
                  <div className="flex items-center gap-2">
                    <ArrowDot />
                    <div className='text-center font-bold'>
                      <div className='p-3 rounded-full bg-primary-blue'>
                        <UserStory className='w-7 h-7' />
                      </div>
                      رزرو من
                    </div>
                    <ArrowDot />
                    <div className='text-center font-bold'>
                      <div className='p-3 border rounded-full'>
                        <CoursePro className='w-7 h-7' />
                      </div>
                      دوره من
                    </div>
                  </div>
                  <p className="text-gray-500 text-center px-4">
                    بعد از تایید ادمین مربوط دوره شما به
                    <span className='text-black underline mx-1'>دوره من </span>
                    اضافه خواهد شد
                  </p>
                  <div className="flex justify-between">
                    <Button className='w-2/3'>
                      لیست رزرو های من
                    </Button>
                    <Button className='bg-white text-black border'
                    onPress={onClose}>
                      باشه
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </>
          )
        }
      </ModalContent>
    </Modal>
  );
}
