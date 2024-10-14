import { useEffect } from 'react';
import {CommentItem} from './CommentItem'

export function CommentList({ comments, handleOpenModal }) {
    return (
      <div className="comments">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} handleOpenModal={handleOpenModal} />
        ))}
      </div>
    );
  }