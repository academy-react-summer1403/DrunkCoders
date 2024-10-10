import React, { useState } from 'react'
import { Button } from '@components'
import { Student,Calender,ThumbUp, ThumbDown, Bookmark } from '@assets'
import { ArrowDot, CoursePro, StarIcon, UserStory } from '@assets/index';
import { Modal, 
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
 } from '@nextui-org/react';

export function OverView() {
    const [likeState, setLikeState] = useState({ like: false, dislike: false });
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
  
  
    function handleLike(identifier) {
      setLikeState((prevState) =>
        identifier === "like"
          ? { like: !prevState.like, dislike: false }
          : { dislike: !prevState.dislike, like: false },
      );
    }
    function handleBookmark() {
      setIsBookmarked((prevState) => !prevState);
    }
  return (
    <>
    
    <div className='w-fit flex items-center gap-2 rounded-xl bg-[#FFD1CB] px-2 py-1 text-xs text-[#FF5454]'>
      <div className='h-2 w-2 rounded-full bg-[#FF5454]'></div>
      <span> درحال برگزاری </span>
    </div>

    <h1 className='text-2xl font-bold flex'>
    ری‌اکت جی‌اس
    <sup className='text-sm font-medium flex'>(4<StarIcon/>)</sup>
    </h1>

    <div className='flex gap-2 w-fit'>
    <Button className='text-xs bg-[#5A7EFF] p-1 px-2' >برنامه نویسی</Button>
    <Button className='text-xs bg-[#5A7EFF] '>مبتدی</Button>
    </div>
    <div className='flex gap-2'>
      <Student/>
      <p>
      120/80 دانشجو
      </p>
    </div>
    <div className='flex gap-2'>
      <Calender/>
      <p>
        20 اردیبهشت 1403 
        <span className='text-xs text-gray-500'>(شروع)</span>
      </p>
    </div>
    <div className='flex gap-2'>
      <Calender/>
      <p>
        22 اردیبهشت 1403
        <span className='text-xs text-gray-500'>(پایان)</span>
      </p>
    </div>
    <p className='font-bold text-xl'>1,800,000 
      <span className='text-primary-blue text-base font-medium'>تومان</span>
    </p>
    <div className='flex gap-4 items-center justify-between'>

      <Button className='text-lg font-bold w-3/5' onPress={onOpen}>رزرو دوره</Button>
      <div className="rounded-full p-2 border-2 cursor-pointer " 
      onClick={() => handleBookmark()}>
        <Bookmark          
          className={`stroke-black dark:stroke-white hover:text-primary-blue
          ${isBookmarked? "text-primary-blue stroke-primary-blue" : "text-transparent"}`}
          />
      </div>
      <div className="rounded-full p-2 border-2 cursor-pointer"
      onClick={() => handleLike("like")}>
        <ThumbUp
          className={`-mt-1 stroke-black dark:stroke-white hover:text-primary-blue
            ${likeState.like ? "text-primary-blue stroke-primary-blue" : "text-transparent"} `}
        />
      </div>
      <div className="rounded-full p-2 border-2 cursor-pointer"
      onClick={() => handleLike("dislike")}>
      <ThumbDown
        className={`stroke-black dark:stroke-white hover:text-primary-blue
          ${likeState.dislike ? "text-primary-blue stroke-primary-blue" : "text-transparent"} `}
      />
      </div>
    </div>
      <Modal
        className='w-[400px]'
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent>
          {
            () => (
              <>
              <ModalBody>
                <div className='flex flex-col rounded-3xl bg-white relative gap-6'>
                    <div className="flex items-center gap-2">
                      <ArrowDot/>
                      <div className='text-center font-bold'>
                        <div className='p-3 rounded-full bg-primary-blue'>
                          <UserStory className='w-7 h-7' />
                        </div>
                        رزرو من
                      </div>
                      <ArrowDot/>
                      <div className='text-center font-bold'>
                        <div className='p-3 border rounded-full '>
                          <CoursePro className='w-7 h-7'/>
                        </div>
                        دوره من
                      </div>

                    </div>
                    <p className="text-gray-500 text-center px-4">
                     بعد از تایید ادمین مربوط دوره شما به
                    <span className='text-black underline mx-1'>دوره من </span> 
                    اضافه خواهد شد
                    </p>
                    <div className="flex justify-between">
                      <Button className='w-2/3' >
                      لیست رزرو های من
                      </Button>
                      <Button className='bg-white text-black border' >
                      باشه
                      </Button>
                    </div>
                </div>
              </ModalBody>
              </>
            )
          }
        </ModalContent>
      </Modal>

</>
  )
}
