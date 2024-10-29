import { StarInCircle } from '@assets';
import { DetailStar } from '@assets/index';
import { rateCourse, rateNews } from '@core/index';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export function Rating({ courseId, newsId, isDisabled }) {
  const [rating, setRating] = useState(null);
  console.log('dis',isDisabled);
  const mutation = useMutation({
    mutationFn: (newRating) => {
      if (courseId) {
        return rateCourse({ courseId, newRating });
      } else if (newsId) {
        return rateNews({ newsId, newRating });
      } else {
        return Promise.reject('No target to rate'); // Fallback for no courseId or newsId
      }
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      console.error('Error sending rating:', error);
    },
  });

  function handleRatingClick(currentRate) {
    if (isDisabled) return; // Prevent any rating actions if disabled
    
    setRating(currentRate);
    mutation.mutate(currentRate);
  }
  

  return (
    <span className={`flex gap-2 items-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <StarInCircle className="w-6 h-6" />
      <span>امتیاز بدید</span>
      <div className="flex space-x-1">
        {[...Array(5)].map((star, index) => {
          const currentRate = index + 1;
          return (
            <label key={index} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={currentRate}
                onClick={() => handleRatingClick(currentRate)}
                className="hidden"
                disabled={isDisabled} // Disable input if isDisabled is true
              />
              <DetailStar
                color={currentRate <= rating ? '#E5EA19' : 'transparent'}
                className="w-6 h-6"
              />
            </label>
          );
        })}
      </div>
    </span>
  );
}
