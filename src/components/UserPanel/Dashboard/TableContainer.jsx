import React from 'react';
import { DashTable } from './DashTable';
import { Button, useDisclosure } from '@nextui-org/react';
import { DashModal } from './DashModal';
import { PanelIndicator } from '@assets/index';

export function TableContainer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className='bg-white p-2 rounded-2xl dark:bg-black overflow-scroll h-[51vh]'>
      <header className='flex justify-between p-2'>
        <h1 className='font-medium'>جدیدترین دوره ها</h1>
        <span className='text-sm text-primary flex items-center cursor-pointer' onClick={onOpen}>
          مشاهده همه
          <PanelIndicator/>
        </span>
      </header>
      <DashTable />
      <DashModal isOpen={isOpen} onClose={onOpenChange} />
    </div>
  );
}
