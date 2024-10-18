import React, { useEffect, useState } from 'react'
import { Button } from '@components'
import { Student, Calender, ThumbUp, ThumbDown, Bookmark } from '@assets'
import { StarIcon } from '@assets/index';
import { reserveCourse,addCourseFavorite } from '@core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDisclosure } from '@nextui-org/react';
import { ReserveModal } from './ReserveModal';
import { removeCourseFavorite } from '@core/index';

export function OverView({ course }) {
  const [likeState, setLikeState] = useState({ like: false, dislike: false });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const courseId = course.courseId; 
  const queryClient = useQueryClient();

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
      console.log("Reservation successful:", data);
    },
  });
     
  function handleReserve() {
    mutation.mutate({ courseId });
  }

  const { mutate : addCourseFavoriteMutate, isPending, isError } = 
  useMutation({
    mutationFn: () => addCourseFavorite({courseId}),
    onSuccess: (data) => {
      alert('added to favoriteCourse');
      queryClient.invalidateQueries(['courseDetails', data])
    },
    onError: (err) => {
      alert('unseccessful')
    }
  });

  
  const setRemoveFavorite = useMutation({
    mutationFn:removeCourseFavorite,
    onSuccess: () => {
      alert('remove from favorite');
    },
    onError: (error) => {
      console.log('no remove', error);
    }
  });
  function removeFavoriteCourse(){
    const payload = {
      favoriteId: course.userFavoriteId
    }
    console.log(payload);
    const formData = new FormData();
    formData.append('CourseFavoriteId', payload.favoriteId);

    setRemoveFavorite.mutate(formData)
  }

  useEffect(() => {
    if (course.isUserFavorite) {
      setIsBookmarked(true);
    }
  }, [course.isUserFavorite]);

  function handleBookmark() {
    setIsBookmarked((prevState) => {
      if (prevState) {
        removeFavoriteCourse();
      } else {
        addCourseFavoriteMutate();
      }
      return !prevState;
    });
  }
  

  function handleLike(identifier) {
    setLikeState((prevState) =>
      identifier === "like"
        ? { like: !prevState.like, dislike: false }
        : { dislike: !prevState.dislike, like: false },
    );
  }

  return (
    <>
      <div className='w-fit flex items-center gap-2 rounded-xl bg-[#FFD1CB] px-2 py-1 text-xs text-[#FF5454]'>
        <div className='h-2 w-2 rounded-full bg-[#FF5454]'></div>
        <span>{course.courseStatusName}</span>
      </div>

      <h1 className='text-2xl font-bold flex'>
        {course.title}
        <sup className='text-sm font-medium flex'>(4<StarIcon />)</sup>
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
        <Button className='text-lg font-bold w-3/5' onClick={() => { onOpen(); handleReserve(); }}>
          رزرو دوره
        </Button>

        <div className="rounded-full p-2 border-2 cursor-pointer" onClick={() => handleBookmark()}>
          <Bookmark
            className={`stroke-black dark:stroke-white hover:text-primary-blue
            ${isBookmarked ? "text-primary-blue stroke-primary-blue" : "text-transparent"}`}
          />
        </div>

        <div className='flex items-center gap-1'>
          <div className="rounded-full p-2 border-2 cursor-pointer" onClick={() => handleLike("like")}>
            <ThumbUp
              className={`-mt-1 stroke-black dark:stroke-white hover:text-primary-blue
              ${likeState.like ? "text-primary-blue stroke-primary-blue" : "text-transparent"}`}
            />
          </div>
          {course.likeCount}
        </div>

        <div className='flex gap-1 items-center'>
          <div className="rounded-full p-2 border-2 cursor-pointer" onClick={() => handleLike("dislike")}>
            <ThumbDown
              className={`stroke-black dark:stroke-white hover:text-primary-blue
              ${likeState.dislike ? "text-primary-blue stroke-primary-blue" : "text-transparent"}`}
            />
          </div>
          {course.dissLikeCount}
        </div>
      </div>

      <ReserveModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
