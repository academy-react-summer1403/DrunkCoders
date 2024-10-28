import { useState } from 'react'

import { OveralUserInfo, ProfileHeader, ProfileTabs } from '@components/index'
import { profilePics } from '@core/index'
import { useSelector } from 'react-redux'

export function ProfileLayout({ userInfo }) {
  const [selected, setSelected] = useState('personalData')
  let { defaultProfilePic, roles } = useSelector(
    (state) => state.token.users,
  ).find((user) => user.isOnline)

  defaultProfilePic = profilePics.find((pic) => pic.key === defaultProfilePic)

  return (
    <>
      {userInfo && (
        <>
          <ProfileHeader
            onSelect={() => setSelected('profilePic')}
            userInfo={userInfo}
            defaultProfilePic={defaultProfilePic}
          />

          <main className="grow rounded-b-2xl bg-white p-10 pt-[88px] dark:bg-black">
            <OveralUserInfo roles={roles} userInfo={userInfo} />

            <div className="mt-14 flex w-full flex-col gap-2 sm:mt-10">
              <ProfileTabs
                userInfo={userInfo}
                onSelect={setSelected}
                selectedItem={selected}
              />
            </div>
          </main>
        </>
      )}
    </>
  )
}
