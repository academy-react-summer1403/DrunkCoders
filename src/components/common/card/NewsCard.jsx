import { Button, CardHeader as CardImage } from '@components'
import { Card as NextUiCard, CardHeader, CardBody } from '@nextui-org/react'
import { LikeAndDislike, NewsCardDetails } from '@components/index'

export function NewsCard({ buttonColor = '#5A7EFF', data: news }) {
  return (
    <NextUiCard className="rounded-3xl bg-[#787878] bg-opacity-[0.13] text-[#272727] shadow-none dark:bg-white/20">
      <CardHeader className="overflow-hidden rounded-3xl bg-[#FF9090] p-0">
        <CardImage buttonColor={buttonColor} data={news} />
      </CardHeader>

      <CardBody className="flex flex-col gap-3 text-right text-sm dark:text-white">
        <NewsCardDetails news={news} />

        <div className="-mt-2 mb-1 flex flex-row items-center justify-between gap-2 xl:flex-row xl:items-center xl:justify-between">
          <LikeAndDislike
            like={news?.currentLikeCount}
            dislike={news?.currentDissLikeCount}
          />

          <Button className="px-4 py-[9px] text-base lg:text-sm xl:text-base">
            بیشتر بخوانید
          </Button>
        </div>
      </CardBody>
    </NextUiCard>
  )
}
