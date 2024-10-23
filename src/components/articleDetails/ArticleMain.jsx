import React from 'react'
import { Rating } from "@components";

export function ArticleMain({data}) {
  return (
    <>
      <img src={data.currentImageAddress} alt="" className='rounded-3xl'/>
      <p>
        {data.describe}
      </p>
      <Rating newsId={data.id}/>
    </>
  )
}
