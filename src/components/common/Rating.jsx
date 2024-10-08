import { StarInCircle } from '@assets';
import { DetailStar } from '@assets/index';
import React, { useState } from 'react';

export function Rating() {
  const [rating, setRating] = useState(null);

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
                onClick={() => setRating(currentRate)}
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
