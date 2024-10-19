import { Bookmark, Calender, ThumbDown, ThumbUp } from '@assets/index';
import React, { useState } from 'react'
import { Button } from '..';

export function ArticleSide(data) {
    const [likeState, setLikeState] = useState({ like: false, dislike: false });
    const [isBookmarked, setIsBookmarked] = useState(false);
    console.log(data);
  return (
    <>
      <h1 className='text-2xl font-bold flex'>
        {data.title}
      </h1>

      <div className='flex gap-2 w-fit'>
        <Button      className='text-xs bg-[#5A7EFF] p-1 px-2'>
            {data.newsCatregoryName}
          </Button>
      </div>

      <div className='flex gap-2'>
        <Calender />
        <p>
          
          <span className='text-xs text-gray-500'>(شروع)</span>
        </p>
      </div>


      <div className='flex gap-2 items-center justify-between'>
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
        </div>

        <div className='flex gap-1 items-center'>
          <div className="rounded-full p-2 border-2 cursor-pointer" onClick={() => handleLike("dislike")}>
            <ThumbDown
              className={`stroke-black dark:stroke-white hover:text-primary-blue
              ${likeState.dislike ? "text-primary-blue stroke-primary-blue" : "text-transparent"}`}
            />
          </div>
        </div>
      </div>
    </>
  )
}
