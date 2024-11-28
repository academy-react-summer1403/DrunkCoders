import { Delete } from '@assets/index';
import { Button, ModalCloseBtn } from '@components/index';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React, { useState } from 'react'

export function DelArtFavModal({isOpen, onClose, title, action, isLoading, content,
  confirmClass, icon
}) {
    const [scrollBehavior, setScrollBehavior] = useState("inside");

    return (
      <Modal 
      isOpen={isOpen} 
      onOpenChange={onClose} 
      hideCloseButton 
      scrollBehavior={scrollBehavior}
      size="md">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex justify-between'>
                <div className='m-auto p-4 rounded-full bg-gray-200'>
                  {icon}
                </div>

                {/* <ModalCloseBtn onClose={onClose}/> */}
              </ModalHeader>
              <ModalBody> 
                <p className='text-lg font-bold text-center'>
                {title}
                </p>
                <p className='flex'>
                     
                    {content}
                </p>
              </ModalBody>
              <ModalFooter className='flex justify-center gap-2'>
                <Button className={confirmClass} 
                onClick={action}
                isLoading={isLoading}>
                    تایید
                </Button>
                <Button onClick={onClose} className='bg-gray-200 text-black text-lg'>
                  انصراف
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
}
