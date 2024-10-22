import React from 'react';
import { DashTable } from './DashTable';
import { Button, useDisclosure } from '@nextui-org/react';
import { DashModal } from './DashModal';

export function TableContainer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className='bg-white p-2 rounded-2xl dark:bg-black overflow-scroll h-[35vh]'>
      <header className='flex justify-between p-2'>
        <h1 className='font-medium'>جدیدترین دوره ها</h1>
        <span className='text-sm text-primary' onClick={onOpen}>
          مشاهده همه
        </span>
      </header>
      <DashTable />
      <DashModal isOpen={isOpen} onClose={onOpenChange} /> {/* Properly pass onClose */}
    </div>
  );
}
