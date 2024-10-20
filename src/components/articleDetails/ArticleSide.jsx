import { Bookmark, Calender, HidePassword, ShowPassword, ThumbDown, ThumbUp } from '@assets/index';
import React, { useState } from 'react'
import { Button } from '..';
import { Avatar, Image } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewsFavorite, delNewsFavorite } from '@core/index';

export function ArticleSide({data}) {
    const queryClient = useQueryClient();
    const [likeState, setLikeState] = useState({ like: false, dislike: false });
    const [isBookmarked, setIsBookmarked] = useState(false);
    console.log('side data',data);

    const { mutate: addFavNews, isPending, isError } =
    useMutation({
      mutationFn: () => addNewsFavorite(data.id),
      onSuccess: (result) => {
        alert('added to fav');
        queryClient.invalidateQueries(['newsDetails', result])  
      },
      onError:(error) => {
        console.log('error add to fav', error);
      }
    })
    const delFavNews = useMutation({
      mutationFn: (deleteEntityId) => delNewsFavorite(deleteEntityId),
      onSuccess: () => {
          alert('Deleted from favorites');
      },
      onError: (error) => {
          console.error('Error deleting favorite', error);
      }
  });
    function handleBookmark() {
      setIsBookmarked((prevState) => {
        if (prevState) {
          delFavNews.mutate(data.currentUserFavoriteId);
        } else {
          addFavNews(data.id);
        }
        return !prevState;
      });
    }

    const farsiDateFormatter = new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = farsiDateFormatter.format(new Date(data.insertDate));
  return (
    <>
      <h1 className='text-2xl font-bold flex'>
        {data.title}
      </h1>

      <div className='flex gap-2 w-fit'>
        <Button className='text-xs bg-[#5A7EFF] p-1 px-2'>
            {data.newsCatregoryName}
          </Button>
      </div>

      <div className='flex gap-2'>
        <Calender />
        <p>
          {formattedTime}
        </p>
      </div>
      <p className='flex items-center gap-2'>
          <HidePassword/>
          <span className=''> {data.currentView} </span>
      </p>
      <p className='text-gray-400'>
          منتشرکننده
      </p>

      <div className='flex justify-between'>
      
          <div className='flex gap-2 items-center'>
            <Avatar src='https://images.unsplash.com/broken' size="md" />
            <p>{data.addUserFullName}</p>
        </div>
        <div className='flex gap-3 items-center'>
          <div className="rounded-full p-2 border-2 cursor-pointer" onClick={() => handleBookmark()}>
            <Bookmark
              className={`stroke-black dark:stroke-white hover:text-primary-blue
              ${isBookmarked ? "text-primary-blue stroke-primary-blue" : "text-transparent"}`}
            />
          </div>

          <div className='flex items-center gap-1'>
            <div className="rounded-full p-2 border-2 cursor-pointer" >
              <ThumbUp
                className={`-mt-1 stroke-black dark:stroke-white hover:text-primary-blue
                ${likeState.like ? "text-primary-blue stroke-primary-blue" : "text-transparent"}`}
              />
            </div>
          </div>

          <div className='flex gap-1 items-center'>
            <div className="rounded-full p-2 border-2 cursor-pointer" >
              <ThumbDown
                className={`stroke-black dark:stroke-white hover:text-primary-blue
                ${likeState.dislike ? "text-primary-blue stroke-primary-blue" : "text-transparent"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
