import { getLatestState } from '@core/index'
import { Navigate } from 'react-router-dom'

export function AuthRoutesProtector({ redirectPath = '/', route }) {
  // console.log(getLatestState().token.users)
  const onlineUser = getLatestState().token.users.find((user) => user.isOnline)
  if (onlineUser) {
    return <Navigate to={redirectPath} replace />
  } else {
    return route
  }
}
export function UserPanelRoutesProtector({ redirectPath = '/auth', route }) {
  //console.log(getLatestState().token.users)
  const onlineUser = getLatestState().token.users.find((user) => user.isOnline)
  if (!onlineUser) {
    return <Navigate to={redirectPath} replace />
  } else {
    return route
  }
}
