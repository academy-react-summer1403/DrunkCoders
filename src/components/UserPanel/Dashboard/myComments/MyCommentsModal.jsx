// MyCommentsModal.js
import { Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs } from '@nextui-org/react';
import { ModalCloseBtn } from '@components/index';
import React, { useState } from 'react';
import { MyCourseComments } from './MyCourseComments';
import { MyBlogComments } from './MyBlogComments';

export function MyCommentsModal({ isOpen, onOpenChange, data }) {
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
              <div className="flex gap-5 items-center md:flex-row flex-col">
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
              <div>
              <ModalCloseBtn onClose={onClose} />
              </div>
            </ModalHeader>
            <ModalBody>
              {selectedTab === "courses" && <MyCourseComments userData={data}/> }
              {selectedTab === "blogs" && <MyBlogComments userData={data}/> }
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
