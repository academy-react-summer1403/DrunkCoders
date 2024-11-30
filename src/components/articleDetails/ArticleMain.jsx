import React from 'react'
import { Rating } from "@components";
import { articleFallback } from '@assets/index';
import { RichTextDecoder } from '@components/common/RichTextDecoder';

export function ArticleMain({data}) {
  return (
    <>
      <img src={data.currentImageAddressTumb? data.currentImageAddressTumb : articleFallback} alt="" className='rounded-3xl h-96'/>
      {/* <p>
        {data.describe}
      </p> */}
      <RichTextDecoder content={data.describe}/>
      <Rating newsId={data.id} isDisabled={data.currentUserSetRate} userRate={data.currentUserRateNumber}/>
    </>
  )
}
