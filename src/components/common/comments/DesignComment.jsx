import { CommentArrow, ThumbDown, ThumbUp } from '@assets/index';
import { Accordion, AccordionItem, Avatar } from '@nextui-org/react';
import { Button } from '@components/index';
import React, { useState } from 'react';
import { convertGrigorianDateToJalaali } from '@core'

export function DesignComment({
  finalReplies, pictureAddress, author, title, describe, likeCount, dislikeCount, comment, handleOpenModal, handleLike, likeState, dash,insertDate
}) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const jalaaliDate = convertGrigorianDateToJalaali(insertDate);


  return (
    <div className="comment flex flex-col p-7">
      <div className={`${isAccordionOpen ? 'transition-all delay-100 duration-300 border-r-3 border-b-3' : ''} rounded-3xl rounded-t-none rounded-l-none border-gray-400`}>
        <div className="flex items-center gap-2 -mr-7">
          <Avatar src={pictureAddress} size="lg" />
          <div>
          <p>{author}</p>
          <p className='text-gray-500'>{jalaaliDate}</p>
          </div>
        </div>
        <div className="mr-8 mt-3 pb-12">
          <p><strong>{title}</strong></p>
          <p className="mt-2">{describe}</p>
          <div className='flex items-center gap-16'>
          {!dash && (
              <Button
                onPress={() => handleOpenModal(true, comment, true)}
                className="-mr-1 mt-4 h-9 w-32 bg-blue-200 font-medium text-blue-600"
              >
                <CommentArrow />
                جواب دادن
              </Button>
            )}
            <div className='flex gap-8 items-center mt-4 z-50'>
              <div className='flex gap-1 items-center' onClick={() => handleLike("like")}>
                <ThumbUp
                  className={`-mt-1 stroke-black dark:stroke-white hover:text-primary-blue
                    ${likeState.like ? "text-primary-blue " : "text-transparent"}`}
                />
                {likeCount}
              </div>
              <div className='flex gap-1 items-center' onClick={() => handleLike("dislike")}>
                <ThumbDown
                  className={`stroke-black dark:stroke-white hover:text-primary-blue
                    ${likeState.dislike ? "text-primary-blue " : "text-transparent"}`}
                />
                {dislikeCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {finalReplies.length > 0 && (
        <Accordion
          isCompact
          className="p-0"
        >
          <AccordionItem
            title={` مشاهده جواب‌ها (${finalReplies.length})` }
            classNames={{
              heading: 'w-fit lg:-mt-24 lg:mr-96 -mt-10 mr-10',
            }}
            indicator={({ isOpen }) => {
              setIsAccordionOpen(isOpen)
              console.log(`Accordion item is ${isAccordionOpen ? 'open' : 'closed'}`);
            }}
          >
            <div className="replies mr-6">
              {finalReplies.map((reply) => (
                <div key={reply.id} className="reply bg-white mt-5 mr-7 dark:bg-black">
                  <div className="flex items-center gap-2">
                    <Avatar src={reply.pictureAddress} size="lg" />
                    <span>{reply.author}</span>
                  </div>
                  <div className="mr-8">
                    <p><strong>{reply.title}</strong></p>
                    <p>{reply.describe}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
