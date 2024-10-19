import { getNewsById } from '@core/index';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';

export function ArticlDetailsContainer() {
    const { id } = useParams();
  
    const { data, isLoading, error } = useQuery({
      queryKey: ["newsDetails", id],
      queryFn: () => getNewsById(id),
    });
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <h1>{data.detailsNewsDto.title}</h1>
      </div>
    );
  }
  
