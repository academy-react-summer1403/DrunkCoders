// CommentList.jsx
import { CommentArrow, ThumbDown, ThumbUp } from '@assets/index';
import { Button } from '@components/index';
import { Avatar } from '@nextui-org/react';
import React from 'react';

export function ArticleCommentList({ comments }) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
           <div className={` rounded-3xl rounded-t-none rounded-l-none border-gray-400`}>
        <div className="flex items-center gap-2 -mr-7">
          <Avatar src={comment.pictureAddress} size="lg" />
          <span>{comment.autor}</span>
        </div>
        <div className="mr-8 mt-3 pb-12">
          <p><strong>{comment.title}</strong></p>
          <p className="mt-2">{comment.describe}</p>
          <div className='flex items-center gap-16'>
            <Button
              // onPress={() => handleOpenModal(true, comment, true)}
              className="-mr-1 mt-4 h-9 w-32 bg-blue-200 font-medium text-blue-600"
            >
              <CommentArrow />
              جواب دادن
            </Button>
            <div className='flex gap-8 items-center mt-4 z-50'>
              <div className='flex gap-1 items-center' 
              // onClick={() => handleLike("like")}
              >
                <ThumbUp
                  className={`-mt-1 stroke-black dark:stroke-white hover:text-primary-blue
                    *\${likeState.like ? "text-primary-blue stroke-primary-blue" : "text-transparent"}`}
                />
                {comment.likeCount}
              </div>
              <div className='flex gap-1 items-center'
              // onClick={() => handleLike("dislike")}
              >
                <ThumbDown
                  className={`stroke-black dark:stroke-white hover:text-primary-blue
                    *\${likeState.dislike ? "text-primary-blue stroke-primary-blue" : "text-transparent"}`}
                />
                {comment.dissLikeCount}
              </div>
            </div>
            
          </div>
        </div>
      </div>
        </div>
      ))}
    </div>
  );
}
