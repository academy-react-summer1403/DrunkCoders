import { UseIcon } from '@components/index'
import { profilePics } from '@core/index'

export function userImgCreator(defaultProfilePic, userInfo) {
  defaultProfilePic = profilePics.find((pic) => pic.key === defaultProfilePic)

  let avatarImg = {}
  if (defaultProfilePic) {
    avatarImg = {
      icon: <UseIcon icon={defaultProfilePic.icon} className="h-12 w-12" />,
    }
  } else {
    avatarImg = { src: userInfo?.currentPictureAddress }
  }

  return avatarImg
}
