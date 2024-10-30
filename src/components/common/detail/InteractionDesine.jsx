import { Bookmark, ThumbDown, ThumbUp } from '@assets/index'
import React from 'react'

export function IntractionDesigne({
    isBookmarked, 
    handleBookmark, 
    likeState, 
    handleLike, 
    likeCount, 
    dislikeCount 
}) {
  return (
    <div className='flex gap-3 items-center'>
    <div className="rounded-full p-2 border-2 cursor-pointer" onClick={handleBookmark}>
      <Bookmark className={`stroke-black dark:stroke-white hover:text-primary-blue ${isBookmarked ? 'text-primary-blue' : 'text-transparent'}`} />
    </div>

    <div className='flex items-center gap-1' onClick={() => handleLike('like')}>
      <div className="rounded-full p-2 border-2 cursor-pointer">
        <ThumbUp className={`-mt-1 stroke-black dark:stroke-white hover:text-primary-blue ${likeState.like ? 'text-primary-blue' : 'text-transparent'}`} />
      </div>
      {likeCount}
    </div>

    <div className='flex gap-1 items-center' onClick={() => handleLike('dislike')}>
      <div className="rounded-full p-2 border-2 cursor-pointer">
        <ThumbDown className={`stroke-black dark:stroke-white hover:text-primary-blue ${likeState.dislike ? 'text-primary-blue' : 'text-transparent'}`} />
      </div>
      {dislikeCount}
    </div>
  </div>
  )
}
