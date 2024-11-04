import { ImageAdd } from '@assets/index'
import { UseIcon } from '@components/index'
import { Badge } from '@nextui-org/react'

export function ProfileHeader({ onSelect, userInfo, defaultProfilePic }) {
  return (
    <header className="relative h-28 rounded-t-2xl bg-primary-blue">
      <div className="absolute -bottom-1/2 right-10">
        <Badge
          content={<ImageAdd className="h-[16px] w-[16px]" />}
          color="primary"
          placement="bottom-right"
          className="mb-3 mr-[5px] cursor-pointer border-3 border-white p-[4px] dark:border-black"
          onClick={() => onSelect()}
          shape="circle"
          isDot
        >
          <div className="flexC h-32 w-32 rounded-full border-[7px] border-white bg-primary-blue dark:border-black">
            {defaultProfilePic && (
              <div className="bgg-red-600 overflow-hidden rounded-full">
                <UseIcon icon={defaultProfilePic.icon} className="h-24 w-24" />
              </div>
            )}
            {!defaultProfilePic && (
              <div className="h-24 w-24 overflow-hidden rounded-full">
                <img src={userInfo.currentPictureAddress} />
              </div>
            )}
          </div>
        </Badge>
      </div>
    </header>
  )
}
