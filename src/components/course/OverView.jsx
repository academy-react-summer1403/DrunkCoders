import React, { useState } from 'react'
import { Button } from '@components'
import { Student,Calender,ThumbUp, ThumbDown, Bookmark } from '@assets'
import { StarIcon } from '@assets/index';

export function OverView() {
    const [likeState, setLikeState] = useState({ like: false, dislike: false });
    const [isBookmarked, setIsBookmarked] = useState(false);
  
  
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
    <div className='flex flex-col w-[38%] border-3 rounded-3xl p-3 h-fit gap-5'>
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
      <Button className='text-lg font-bold w-3/5' >رزرو دوره</Button>
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

</div>
  )
}
