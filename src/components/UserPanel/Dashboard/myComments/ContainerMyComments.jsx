// MyComments.js
import { PanelIndicator } from '@assets/index';
import { useDisclosure } from '@nextui-org/react';
import React from 'react';
import { MyCommentsModal } from './MyCommentsModal';
import { MyCourseComments } from './MyCourseComments';
import { MyBlogComments } from './MyBlogComments';

export function ContainerMyComments({data}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="sm:w-[45%] w-full h-[266px] rounded-2xl bg-white p-3 dark:bg-black overflow-hidden"> 
        <header className="flex justify-between">
          <div>نظرات‌ شما</div>
          <div className="text-primary-500 cursor-pointer flex items-center" onClick={onOpen}>
            مشاهده همه
            <PanelIndicator />
          </div>
        </header>
        <div className='flex scale-90 justify-between '>
            <div className="w-1/2 overflow-hidden scale-9 -m-4">
                <MyCourseComments userData={data}/>
            </div>
            <div className=' border-2 h-[200px]'></div>
            <div className="w-1/2 overflow-hidden scale-9 -m-4">
                <MyBlogComments userData={data}/>
            </div>
        </div>
      </div>
      <MyCommentsModal isOpen={isOpen} onOpenChange={onOpenChange} data={data} />
    </>
  );
}
