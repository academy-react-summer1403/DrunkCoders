import {  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination } from '@nextui-org/react';
import React from 'react';
import { DashTable } from './DashTable';
import { Button } from '@components/index';

export function DashModal({ isOpen, onClose }) {
  return (
    <Modal 
      size='4xl'
      hideCloseButton
      isOpen={isOpen} 
      onOpenChange={onClose} // Bind onClose handler to control modal visibility
      scrollBehavior="inside"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex justify-between">
            Modal Title
            <Button className='bg-transparent text-red-500 w-fit border-2 rounded-3xl border-red-500' onPress={onClose}>  {/* Close modal when clicked */}
            بستن x
            </Button>
          </ModalHeader>
          <ModalBody>
            <DashTable />
          </ModalBody>
          <ModalFooter>
          <Pagination isCompact showControls 
          total={5} initialPage={1} className='m-auto'/>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
