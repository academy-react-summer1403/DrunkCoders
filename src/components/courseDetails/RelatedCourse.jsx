import { getRelatedCourse } from '@core/index';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { CourseCard } from '..';

export function RelatedCourse({techId}) {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['related', techId],
    queryFn: () => getRelatedCourse(techId),
    enabled: !!techId,
  });

  if (isLoading) return <div>Loading related courses...</div>;
  if (isError) return <div>Error fetching related courses</div>;

  const courses = data?.courseFilterDtos || [];

  return (
    <>
      <h1 className='font-bold text-2xl mb-6 mt-10'>دوره‌های دیگر</h1>
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 '>

        {courses?.slice(0,4).map((course, index) => (
          <CourseCard
          key={course.courseId}
          data={course}
          buttonColor={index % 3 === 1 ? '#DE59FF' : '#5A7EFF'}
          view='grid'
          />
        ))}
      </div>
    </>
  )
}
