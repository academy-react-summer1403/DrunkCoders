import React from 'react';
import { Button } from '..';
import { Avatar, Image } from '@nextui-org/react';
import { Calender, HidePassword } from '@assets/index';
import { ArticleUserIntraction } from '@components/articleDetails/ArticleUserIntraction';

export function ArticleSide({ data }) {
  const farsiDateFormatter = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = farsiDateFormatter.format(new Date(data.insertDate));

  return (
    <>
      <h1 className='text-2xl font-bold flex'>{data.title}</h1>
      <div className='flex gap-2 w-fit'>
        <Button className='text-xs bg-[#5A7EFF] p-1 px-2'>
          {data.newsCatregoryName}
        </Button>
      </div>
      <div className='flex gap-2'>
        <Calender />
        <p>{formattedTime}</p>
      </div>
      <p className='flex items-center gap-2'>
        <HidePassword />
        <span className=''>{data.currentView}</span>
      </p>
      <p className='text-gray-400'>منتشرکننده</p>
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center'>
          <Avatar src='https://images.unsplash.com/broken' size="md" />
          <p>{data.addUserFullName}</p>
        </div>
        <ArticleUserIntraction pageId={data.id} data={data} />
      </div>
    </>
  );
}
