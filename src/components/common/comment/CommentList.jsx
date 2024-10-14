import { useEffect } from 'react';
import {CommentItem} from './CommentItem'

export function CommentList({ comments, handleOpenModal }) {
  useEffect(() => {
    console.log('Comments in CommentList:', comments);
  }, [comments]);
    return (
      <div className="comments">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} handleOpenModal={handleOpenModal} />
        ))}
      </div>
    );
  }