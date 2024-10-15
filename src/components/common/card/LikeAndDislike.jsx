import { useEffect, useState } from 'react'
import { ThumbUp, ThumbDown } from '@assets'
import { addLikeForCourse } from '@core/index'

export function LikeAndDislike({
  like,
  dislike,
  view,
  className,
  userLikeStatus,
  onLikeAndDislike,
}) {
  async function handleLike(identifier) {
    if (identifier === 'like') {
      if (userLikeStatus.like) onLikeAndDislike('remove')
      else onLikeAndDislike('like')
    } else {
      if (userLikeStatus.dislike) onLikeAndDislike('remove')
      else onLikeAndDislike('dislike')
    }
  }
  return (
    <div
      className={`-mb-1 flex ${className} ${view === 'list' ? 'gap-9' : 'gap-3'}`}
    >
      <div className="flex gap-2">
        <ThumbUp
          onClick={() => handleLike('like')}
          className={`-mt-1 cursor-pointer stroke-black hover:text-primary-blue dark:stroke-white ${userLikeStatus.like ? 'text-primary-blue' : 'text-transparent'} `}
        />
        <span className="">{like || 12}</span>
      </div>
      <div className="flex gap-2">
        <ThumbDown
          onClick={() => handleLike('dislike')}
          className={`cursor-pointer stroke-black hover:text-primary-blue dark:stroke-white ${userLikeStatus.dislike ? 'text-primary-blue' : 'text-transparent'} `}
        />
        <span className="">{dislike || 99}</span>
      </div>
    </div>
  )
}
