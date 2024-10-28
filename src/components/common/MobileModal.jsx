import { Button, ModalCloseBtn } from '@components/index'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'

export function MobileModal({
  isOpen,
  onOpenChange,
  title,
  children,
  confirmButton,
  dash,
  onOpen
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      isDismissable={false}
      size="3xl"
      className={`rounded-bb-none sm: relative rounded-t-[32px] sm:m-0`}
      classNames={{
        wrapper: '',
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
              {dash ? (
                <div className='flex flex-col w-full'>
                  <header className='flex justify-between '>
                      <p>
                      جدیدترین دوره ها
                      </p>
                      <ModalCloseBtn onClose={onClose}/>
                  </header>
                  
                  <Button className='w-fit text-lg' onPress={onOpen}>
                  فیلتر
                  </Button>
                </div>   
              ):(
                <>
                  <p className="text-xl font-medium">ترتیب و فیلتر {title}</p>

                  <ModalCloseBtn onClose={onClose} />
                </>
              )}

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
