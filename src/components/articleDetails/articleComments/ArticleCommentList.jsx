// CommentList.jsx
import { DesignComment } from '@components/common/comments/DesignComment';
import React from 'react';
import { ArtCommentItems } from './ArtCommentItems';

export function ArticleCommentList({ comments }) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
            <ArtCommentItems
            comment={comment}
            key={comment.id}
            />
      ))}
    </div>
  );
}
