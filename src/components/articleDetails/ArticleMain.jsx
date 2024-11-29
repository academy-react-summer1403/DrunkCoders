import React from 'react'
import { Rating } from "@components";
import { coursesFallback } from '@assets/index';

export function ArticleMain({data}) {
  console.log(data);
  return (
    <>
      <img src={data.currentImageAddressTumb? data.currentImageAddressTumb : coursesFallback} alt="" className='rounded-3xl h-96'/>
      <p>
        {data.describe}
      </p>
      <Rating newsId={data.id} isDisabled={data.currentUserSetRate} userRate={data.currentUserRateNumber}/>
    </>
  )
}
