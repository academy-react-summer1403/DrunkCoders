import { Button, ModalCloseBtn } from '@components/index';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React, { useState } from 'react'

export function DelArtFavModal({isOpen, onClose, title, action, isLoading, content}) {
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
                <p>
                {title}
                </p>
                <ModalCloseBtn onClose={onClose}/>
              </ModalHeader>
              <ModalBody> 
                <p className='flex'>
                     حذف:
                    {content}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button className='bg-red-500 text-lg w-full' 
                onClick={action}
                isLoading={isLoading}>
                    تایید
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
}
