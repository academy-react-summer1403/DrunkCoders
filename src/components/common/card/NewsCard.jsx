import { Button, CardHeader as CardImage } from '@components'
import { Card as NextUiCard, CardHeader, CardBody } from '@nextui-org/react'
import { LikeAndDislike, NewsCardDetails } from '@components/index'
import { Link } from 'react-router-dom'
import { useArticleLikeAndDislikeUpdate } from '@hooks/index'
import {
  addDislikeForArticle,
  addLikeForArticle,
  removeArticleLikeOrDislike,
} from '@core/index'

export function NewsCard({
  buttonColor = '#5A7EFF',
  data: news,
  view = 'grid',
  queryKey,
}) {
  // optimistic updating using tanstack query to add like
  const { mutate: addLikeMutatte } = useArticleLikeAndDislikeUpdate(
    addLikeForArticle,
    queryKey,
    'like',
  )
  // optimistic updating using tanstack query to add dislike
  const { mutate: addDislikeMutatte } = useArticleLikeAndDislikeUpdate(
    addDislikeForArticle,
    queryKey,
    'dislike',
  )

  // optimistic updating using tanstack query to remove like or dislike
  const { mutate: removeLikeDislikeMutate } = useArticleLikeAndDislikeUpdate(
    removeArticleLikeOrDislike,
    queryKey,
    'remove',
  )
  function handleLikeAndDislike(identifier) {
    if (identifier === 'like') {
      addLikeMutatte(news.id)
    } else if (identifier === 'dislike') {
      addDislikeMutatte(news.id)
    } else {
      removeLikeDislikeMutate({
        likeId: news.likeId,
        articleId: news.id,
      })
    }
  }
  // console.log(news)
  return (
    <NextUiCard
      className={`grid rounded-3xl bg-[#787878] bg-opacity-[0.13] text-[#272727] shadow-none dark:bg-white/20 ${view === 'grid' ? 'grid-cols-1' : 'lg:h-[286px] lg:grid-cols-12'}`}
    >
      <CardHeader
        className={`overflow-hidden rounded-3xl bg-[#FF9090] p-0 ${view === 'list' ? 'h-[225px] lg:col-span-5 lg:h-full' : 'h-[225px]'}`}
      >
        <CardImage buttonColor={buttonColor} data={news} view={view} />
      </CardHeader>

      <CardBody
        className={`flex flex-col gap-3 text-right text-sm dark:text-white ${view === 'list' ? 'lg:col-span-7' : ''}`}
      >
        <NewsCardDetails news={news} view={view} />

        <div className="-mt- mb-1 flex flex-row items-center justify-between gap-2">
          <LikeAndDislike
            userLikeStatus={{
              like: news.currentUserIsLike,
              dislike: news.currentUserIsDissLike,
            }}
            like={news.currentLikeCount}
            dislike={news.currentDissLikeCount}
            onLikeAndDislike={handleLikeAndDislike}
            view={view}
          />
          <Button
            as={Link}
            to={'/articles/' + news.id}
            className="px-4 py-[9px] text-base lg:text-sm xl:text-base"
          >
            بیشتر بخوانید
          </Button>
        </div>
      </CardBody>
    </NextUiCard>
  )
}
