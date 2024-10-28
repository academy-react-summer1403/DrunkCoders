import { ThumbUp, ThumbDown } from '@assets'

export function LikeAndDislike({
  like,
  dislike,
  view,
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
    <div className={`-mb-1 flex gap-3 ${view === 'list' ? 'lg:gap-9' : ''}`}>
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
