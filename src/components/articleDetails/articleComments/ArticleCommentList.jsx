// CommentList.jsx
import { DesignComment } from '@components/common/comments/DesignComment';
import React from 'react';

export function ArticleCommentList({ comments }) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
            <DesignComment
                finalReplies
                likeState
                pictureAddress={comment.pictureAddress}
                author={comment.autor}
                describe={comment.describe}
                comment={comment}
                likeCount={comment.likeCount}
                dislikeCount={comment.disslike}
            />
        </div>
      ))}
    </div>
  );
}
