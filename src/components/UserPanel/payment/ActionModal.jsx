import React from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from '@nextui-org/react';
import { Button } from '@components';
import { ModalCloseBtn } from '@components/index';

export function ActionModal({ isOpen, onClose, title, content }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} hideCloseButton size="md">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex justify-between'>
              {title}
              <ModalCloseBtn onClose={onClose}/>
            </ModalHeader>
            <ModalBody>
              {content}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
