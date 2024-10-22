import React from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { HidePassword } from '@assets/index';
import { useQuery } from '@tanstack/react-query';
import { getLatestCourses } from '@core/index';

export function DashTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashTable'],
    queryFn: getLatestCourses,
  });
  
  const courses = data?.courseFilterDtos ?? [];
  console.log(courses);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (

    <Table removeWrapper aria-label="Example static collection table" >
      <TableHeader>
        <TableColumn>نام دوره</TableColumn>
        <TableColumn>درباره دوره</TableColumn>
        <TableColumn>اساتید دوره</TableColumn>
        <TableColumn>تاریخ برگزاری</TableColumn>
        <TableColumn>قیمت دوره</TableColumn>
        <TableColumn></TableColumn>
      </TableHeader>
      <TableBody>
        {courses.slice(0,10).map((course) => {
          const formattedDate = new Date(course.lastUpdate).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <TableRow key={course.courseId}>
              <TableCell className='max-w-8 text-lg font-medium text-ellipsis whitespace-nowrap overflow-hidden'>
                {course.title}
              </TableCell>
              <TableCell className='max-w-8 text-ellipsis whitespace-nowrap overflow-hidden ml-2 text-gray-500'>
                {course.describe}
              </TableCell>
              <TableCell className='max-w-8 text-ellipsis whitespace-nowrap overflow-hidden ml-2'>
                {course.teacherName}
              </TableCell>
              <TableCell className='max-w-8'>
                {formattedDate}
              </TableCell>
              <TableCell className='max-w-8 text-[16px] text-ellipsis whitespace-nowrap overflow-hidden '>
                {course.cost}تومان
              </TableCell>
              <TableCell>
                <Tooltip content='مشاهده'>
                  <span>
                    <HidePassword />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>

  );
}
