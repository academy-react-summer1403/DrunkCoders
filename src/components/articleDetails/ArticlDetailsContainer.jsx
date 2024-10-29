import { DetailsLayout } from '@components/courseDetails/DetailsLayout';
import { getNewsById } from '@core/index';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';
import { ArticleSide } from './ArticleSide';
import { ArticleMain } from './ArticleMain';
import { ArticleComments } from './articleComments/ArticleComments';

export function ArticlDetailsContainer() {
    const { id } = useParams();
  
    const { data, isLoading, error } = useQuery({
      queryKey: ["newsDetails", id],
      queryFn: () => getNewsById(id),
    });
    
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const newsInfo = data.detailsNewsDto
    console.log(newsInfo.id);
    
    return (
      <div>
        <DetailsLayout
        asideContent={<ArticleSide data={newsInfo} />}
        >
          <ArticleMain data={newsInfo} isDisabled={data.currentUserSetRate}/>
          <ArticleComments newsId={newsInfo.id} data={newsInfo} />
        </DetailsLayout>
      </div>
    );
  }
  
