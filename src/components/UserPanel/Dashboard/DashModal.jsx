import {  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';
import { DashTable } from './DashTable';
import { Button, ModalCloseBtn, Pagination } from '@components/index';

export function DashModal({ isOpen, onClose }) {
  return (
    <Modal 
      size='4xl'
      hideCloseButton
      isOpen={isOpen} 
      onOpenChange={onClose}
      scrollBehavior="inside"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex justify-between">
            Modal Title
            <ModalCloseBtn/>
          </ModalHeader>
          <ModalBody>
            <DashTable />
          </ModalBody>
          <ModalFooter>
            <div className='m-auto'>
              <Pagination
              totalPageCount={2}/>
            </div>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
