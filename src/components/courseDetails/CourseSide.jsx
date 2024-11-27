import React, { useEffect, useState } from 'react'
import { Button } from '@components'
import { Student, Calender, ThumbUp, ThumbDown, Bookmark } from '@assets'
import { StarIcon } from '@assets/index';
import { reserveCourse,addCourseFavorite } from '@core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDisclosure } from '@nextui-org/react';
import { ReserveModal } from './ReserveModal';
import toast from 'react-hot-toast';

import { CourseInteraction } from './CourseInteraction';

export function OverView({ course }) {
  console.log(course.courseReseveId);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const courseId = course.courseId; 

  const farsiDateFormatter = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedStartTime = farsiDateFormatter.format(new Date(course.startTime));
  const formattedEndTime = farsiDateFormatter.format(new Date(course.endTime));

  const mutation = useMutation({
    mutationFn: reserveCourse,
    onSuccess: (data) => {
      if(data.success){

        toast.success(' به لیست رزرو اضافه شد ')
      }else{
        toast.error(' متاسفیم به لیست رزرو اضافه نشد  ')
      }
    },
  });
     
  function handleReserve() {
    mutation.mutate({ courseId });
  }

  const isReserved = course.courseReseveId !== '00000000-0000-0000-0000-000000000000';
  console.log('isReserved', isReserved);
  return (
    <>
      <div className='w-fit flex items-center gap-2 rounded-xl bg-[#FFD1CB] px-2 py-1 text-xs text-[#FF5454]'>
        <div className='h-2 w-2 rounded-full bg-[#FF5454]'></div>
        <span>{course.courseStatusName}</span>
      </div>

      <h1 className='text-2xl font-bold flex'>
        {course.title}
        <sup className='text-sm font-medium flex'>({course.currentRate}<StarIcon />)</sup>
      </h1>

      <div className='flex gap-2 w-fit'>
        {course.techs.map((tech, index) => (
          <Button key={index} className='text-xs bg-[#5A7EFF] p-1 px-2'>
            {tech}
          </Button>
        ))}
        <Button className='text-xs bg-[#5A7EFF] '>{course.courseLevelName}</Button>
      </div>

      <div className='flex gap-2'>
        <Student />
        <p>
          {course.capacity}/{course.currentRegistrants} دانشجو
        </p>
      </div>
      <div className='flex gap-2'>
        <Calender />
        <p>
          {formattedStartTime}
          <span className='text-xs text-gray-500'>(شروع)</span>
        </p>
      </div>
      <div className='flex gap-2'>
        <Calender />
        <p>
          {formattedEndTime}
          <span className='text-xs text-gray-500'>(پایان)</span>
        </p>
      </div>

      <p className='font-bold text-xl'>
        {course.cost}
        <span className='text-primary-blue text-base font-medium'>تومان</span>
      </p>

      <div className='flex gap-2 items-center justify-between'>
        {isReserved? 
        <Button className='text-lg font-bold w-3/5' isDisabled >
          رزرو شده
        </Button>
        :
        <Button className='text-lg font-bold w-3/5' onClick={() => { onOpen(); handleReserve(); }}>
          رزرو دوره
        </Button>
        }

        <CourseInteraction
        course={course}
        />
      </div>

      <ReserveModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
