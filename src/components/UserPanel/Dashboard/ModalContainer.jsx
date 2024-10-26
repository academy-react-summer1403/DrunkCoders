import React from 'react';
import { DashTable } from './DashTable';
import { Button, useDisclosure } from '@nextui-org/react';
import { DashDeskModal } from './DashDeskModal';
import { PanelIndicator } from '@assets/index';
import { DashMobileModal } from './DashMobileModal';
import { useMediaQuery } from './useMediaQuery'; // Import the media query hook

export function ModalContainer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)'); // Media query for 'md' screen size

  // Handle open action for modals
  const handleOpen = () => {
    onOpen(); // Open the modal
  };

  return (
    <div className='bg-white p-2 rounded-2xl dark:bg-black overflow-scroll h-[51vh]'>
      <header className='flex justify-between p-2'>
        <h1 className='font-medium'>جدیدترین دوره ها</h1>
        <span className='text-sm text-primary flex items-center cursor-pointer' onClick={handleOpen}>
          مشاهده همه
          <PanelIndicator />
        </span>
      </header>
      <DashTable />
      

      {isMobile ? (
        <DashMobileModal isOpen={isOpen} onClose={onOpenChange} />
      ) : (
        <DashDeskModal isOpen={isOpen} onClose={onOpenChange} />
      )}
    </div>
  );
}
