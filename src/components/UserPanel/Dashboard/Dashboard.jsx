import React, { useState } from 'react'
import { DashHeader } from './DashHeader'
import { DashMain } from './DashMain'
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserProfile } from '@core/index';
import { ModalContainer } from './ModalContainer';
import { Spinner } from '@nextui-org/react';

export function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUserProfile,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner size="lg" label="در حال دریافت ..." labelColor="primary" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading user data!</div>; // Show an error message if the query fails
  }
  return (
    <div className='flex flex-col gap-5'>
    <DashHeader data={data} />
    <DashMain data={data} />
    <ModalContainer className='hidden'/>
    </div>
  )
}
