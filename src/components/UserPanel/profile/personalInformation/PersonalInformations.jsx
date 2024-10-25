import { UserInformationForm, UserProfileCompletion } from '@components/index'
import { useState } from 'react'

export function PersonalInformations({ userInfo }) {
  return (
    <>
      {userInfo && (
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-start">
          <UserInformationForm userInfo={userInfo} />

          <UserProfileCompletion userInfo={userInfo} />
        </div>
      )}
    </>
  )
}
