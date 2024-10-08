import { useState } from 'react'
import { ThumbUp, ThumbDown } from '@assets'

export function LikeAndDislike({ like, dislike, view, className }) {
  const [likeState, setLikeState] = useState({ like: false, dislike: false })

  function handleLike(identifier) {
    setLikeState((prevState) =>
      identifier === 'like'
        ? { like: !prevState.like, dislike: false }
        : { dislike: !prevState.dislike, like: false },
    )
  }
  return (
    <div
      className={`-mb-3 flex ${className} ${view === 'list' ? 'gap-9' : 'gap-3'}`}
    >
      <div className="flex gap-2">
        <ThumbUp
          onClick={() => handleLike('like')}
          className={`-mt-1 cursor-pointer stroke-black hover:text-primary-blue dark:stroke-white ${likeState.like ? 'text-primary-blue' : 'text-transparent'} `}
        />
        <span className="">{like || 12}</span>
      </div>
      <div className="flex gap-2">
        <ThumbDown
          onClick={() => handleLike('dislike')}
          className={`cursor-pointer stroke-black hover:text-primary-blue dark:stroke-white ${likeState.dislike ? 'text-primary-blue' : 'text-transparent'} `}
        />
        {dislike || 99}
      </div>
    </div>
  )
}
