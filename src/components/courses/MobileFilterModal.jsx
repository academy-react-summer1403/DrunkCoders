import { Cancel2 } from '@assets/index'
import { Button, CourseFilter } from '@components/index'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'

export function MobileFilterModal({ isOpen, onOpenChange, children }) {
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
            // opacity: 0,
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
              <p className="text-xl font-medium">ترتیب و فیلتر</p>

              <Button
                onClick={onClose}
                variant="bordered"
                startContent={<Cancel2 />}
                className="border border-[#FF5454] bg-transparent text-[#FF5454]"
              >
                بستن
              </Button>
            </ModalHeader>
            <ModalBody>
              {children}
              <Button onPress={onClose} className="py-3 text-lg">
                اعمال
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
