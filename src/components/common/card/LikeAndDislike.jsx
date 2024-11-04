import { ThumbUp, ThumbDown } from '@assets'

export function LikeAndDislike({
  like,
  dislike,
  view,
  userLikeStatus,
  onLikeAndDislike,
  circle,
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
        {!circle && (
          <>
            <ThumbUp
              onClick={() => handleLike('like')}
              className={`-mt-1 cursor-pointer stroke-black hover:text-primary-blue dark:stroke-white ${userLikeStatus.like ? 'text-primary-blue' : 'text-transparent'} `}
            />
            <span className="">{like || 12}</span>
          </>
        )}

        {circle && (
          <div
            className={`flexC h-14 w-14 cursor-pointer rounded-full text-transparent transition-all hover:border-none hover:bg-primary-blue hover:stroke-white dark:stroke-white ${userLikeStatus.like === '1' ? 'bg-primary-blue stroke-white' : 'border stroke-black dark:border-gray-500'}`}
          >
            <ThumbUp
              onClick={() => handleLike('like')}
              className={`-mt-1 stroke-inherit text-inherit`}
            />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {!circle && (
          <>
            <ThumbDown
              onClick={() => handleLike('dislike')}
              className={`cursor-pointer stroke-black hover:text-primary-blue dark:stroke-white ${userLikeStatus.dislike ? 'text-primary-blue' : 'text-transparent'} `}
            />
            <span className="">{dislike || 99}</span>
          </>
        )}

        {circle && (
          <div
            className={`flexC h-14 w-14 cursor-pointer rounded-full text-transparent transition-all hover:border-none hover:bg-primary-blue hover:stroke-white dark:stroke-white ${userLikeStatus.dislike === '1' ? 'bg-primary-blue stroke-white' : 'border stroke-black dark:border-gray-500'}`}
          >
            <ThumbDown
              onClick={() => handleLike('dislike')}
              className={`stroke-inherit text-inherit`}
            />
          </div>
        )}
      </div>
    </div>
  )
}
