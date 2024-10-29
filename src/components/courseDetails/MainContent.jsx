import React from 'react'
import { Rating } from "@components";
import { DetailsContentLayout } from './DetailsContentLayout';

export function MainContent({course}) {
  return (
    <>
      <DetailsContentLayout
      imageSrc={course.imageAddress}
      teacherName={course.teacherName}
      title={course.title}
      description={course.describe}
      pageId={course.courseId}
      currentUserSetRate = {course.currentUserSetRate}
      />
    </>
  )
}
