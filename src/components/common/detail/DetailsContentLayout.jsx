import React from 'react';
import { Rating } from "@components";
import { coursesFallback } from '@assets/index';
import { RichTextDecoder } from '../RichTextDecoder';

export function DetailsContentLayout({ currentUserSetRate,imageSrc, teacherName, title, description, pageId, userRate }) {
  return (
    <>
      <img src={imageSrc? imageSrc: coursesFallback} alt="" className='bg-[#FF9090] w-full h-96 rounded-3xl' />
      <p className='text-gray-400'>مدرس</p>
      <div className='flex md:flex-row flex-col gap-[10%]'>
        <div className='flex gap-2 items-center'>
          <img src="" alt="" className="rounded-full w-10 h-10 bg-gray-300" />
          <span>{teacherName}</span>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-4">
        <span className="text-gray-500">توضیحات</span>
        <h1 className="font-bold text-xl">{title}</h1>
        {/* <p>{description}</p> */}
        <RichTextDecoder content={description}/>

        <Rating courseId={pageId} isDisabled={currentUserSetRate} userRate={userRate} />
      </div>
    </>
  );
}
