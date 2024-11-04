import { Button, ModalCloseBtn } from '@components/index'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'

export function MobileModal({
  isOpen,
  onOpenChange,
  title,
  children,
  confirmButton,
  dash,
  onOpen,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      scrollBehavior="inside"
      isDismissable={false}
      size="5xl"
      className={`relative rounded-t-[32px] sm:m-0`}
      classNames={{
        wrapper: '',
      }}
      motionProps={
        true && {
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
        }
      }
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between gap-1">
              {dash ? (
                <div className="flex w-full flex-col">
                  <header className="flex justify-between">
                    <p>جدیدترین دوره ها</p>
                    <ModalCloseBtn onClose={onClose} />
                  </header>

                  <Button className="w-fit text-lg" onPress={onOpen}>
                    فیلتر
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-xl font-medium">{title}</p>

                  <ModalCloseBtn onClose={onClose} />
                </>
              )}
            </ModalHeader>

            <ModalBody>{children}</ModalBody>

            <ModalFooter className="pb-5">
              {confirmButton && (
                <Button
                  onPress={onClose}
                  className="w-full py-3 text-xl font-medium"
                >
                  اعمال
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
