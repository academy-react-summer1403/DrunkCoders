// MyCommentsModal.js
import { Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs } from '@nextui-org/react';
import { ModalCloseBtn } from '@components/index';
import React, { useState } from 'react';
import { MyCourseComments } from './MyCourseComments';
import { MyBlogComments } from './MyBlogComments';

export function MyCommentsModal({ isOpen, onOpenChange }) {
  const [selectedTab, setSelectedTab] = useState("courses");

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      hideCloseButton
      motionProps={{
        variants: {
          enter: {
            scale: 1,
            y: "var(--slide-enter)",
            opacity: 1,
            transition: {
              scale: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
              opacity: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
              y: { type: "spring", bounce: 0, duration: 0.6 },
            },
          },
          exit: {
            scale: 1.05,
            y: "var(--slide-exit)",
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: [0.42, 0, 0.58, 1],
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between">
              <div className="flex gap-5 items-center">
                <p className="text-3xl">نظرات شما</p>
                <div className="ltr">
                  <Tabs
                    color="primary"
                    radius="full"
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => setSelectedTab(key)}
                  >
                    <Tab key="courses" title="دوره ها" />
                    <Tab key="blogs" title="اخبار و مقالات" />
                  </Tabs>
                </div>
              </div>
              <ModalCloseBtn onClose={onClose} />
            </ModalHeader>
            <ModalBody>
              {selectedTab === "courses" && <MyCourseComments/> }
              {selectedTab === "blogs" && <MyBlogComments/> }
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
