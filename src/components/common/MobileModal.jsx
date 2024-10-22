import { Button, ModalCloseBtn } from '@components/index'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'

export function MobileModal({
  isOpen,
  onOpenChange,
  title,
  children,
  confirmButton,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      isDismissable={false}
      size="2xl"
      className="relative w-[110vw] rounded-b-none rounded-t-[32px]"
      classNames={{
        base: 'w-[100vw]',
        wrapper: 'w-[100vw]  p-0 m-0',
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            transition: {
              duration: 0.6,
              ease: 'easeOut',
            },
          },
          exit: {
            y: 1000,
            transition: {
              duration: 0.4,
              ease: 'easeIn',
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between gap-1">
              <p className="text-xl font-medium">ترتیب و فیلتر {title}</p>

              <ModalCloseBtn onClose={onClose} />
            </ModalHeader>

            <ModalBody>
              {children}

              {confirmButton && (
                <Button onPress={onClose} className="py-3 text-lg">
                  اعمال
                </Button>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
