import { StarInCircle } from '@assets';
import { DetailStar } from '@assets/index';
import { rateCourse } from '@core/index';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

export function Rating({courseId}) {
  const [rating, setRating] = useState(null);
  
  const mutation = useMutation({
    mutationFn: (newRating) => rateCourse({courseId, newRating}),
    onSuccess: (response) => {
      console.log('Rating successfully sent:', response);
    },
    onError: (error) => {
      console.error('Error sending rating:', error);
    },
  });

  function handleRatingClick (currentRate) {
    setRating(currentRate);
    console.log(`Current rating: ${currentRate}`);
    mutation.mutate(currentRate);
  };

  return (
    <span className="flex gap-2 items-center">
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
