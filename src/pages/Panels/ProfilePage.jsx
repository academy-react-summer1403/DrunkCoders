import { ProfileLayout } from '@components/index'
import { useOutletContext } from 'react-router-dom'

export function ProfilePage() {
  const userInfo = useOutletContext()

  return (
    <>
      <ProfileLayout userInfo={userInfo} />
    </>
  )
}
