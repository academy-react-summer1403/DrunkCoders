import React from 'react'
import { DashTable } from './DashTable'
import { Button, useDisclosure } from '@nextui-org/react'
import { DashDeskModal } from './DashDeskModal'
import { PanelIndicator } from '@assets/index'
import { DashMobileModal } from './DashMobileModal'
import { useMediaQuery } from '../../../hooks/useMediaQuery' // Import the media query hook

export function ModalContainer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const isMobile = useMediaQuery('(max-width: 768px)') // Media query for 'md' screen size

  // Handle open action for modals
  const handleOpen = () => {
    onOpen() // Open the modal
  }

  return (
    <div className="no-scrollbar h-[51vh] overflow-scroll rounded-2xl bg-white p-2 dark:bg-black">
      <header className="flex justify-between p-2">
        <h1 className="font-medium">جدیدترین دوره ها</h1>
        <span
          className="flex cursor-pointer items-center text-sm text-primary"
          onClick={handleOpen}
        >
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
  )
}
