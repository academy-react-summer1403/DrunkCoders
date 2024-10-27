import {
  AddMorePic,
  SelectAndDeletePic,
  SelectedPicAndThreeDot,
  UseIcon,
} from '@components/index'
import { profilePics as constantProfilePics, getLocalStroge } from '@core/index'
import { useEffect, useState } from 'react'

export function ProfilePic({ userInfo }) {
  let newPicArray = userInfo.userImage.map((pic) => ({
    key: pic.puctureAddress,
    icon: pic.puctureAddress,
    id: pic.id,
  }))

  newPicArray = [...constantProfilePics, ...newPicArray]

  const [image, setImage] = useState()
  const [profilePics, setProfilePics] = useState(newPicArray)

  useEffect(() => {
    if (image) {
      setProfilePics((prevState) => {
        if (!prevState.some((item) => item.key === image)) {
          return [...prevState, { key: image, icon: image }]
        }
        return prevState
      })
    }
  }, [image])

  const selectedImg =
    getLocalStroge('defaultProfilePic') ?? userInfo.currentPictureAddress

  function handleImagePicker(img) {
    setImage(img)
  }

  function handleMoreIconClicked(key) {
    setProfilePics((prevState) =>
      prevState.map((item) =>
        item.key === key ? { ...item, isMoreOpen: !item.isMoreOpen } : item,
      ),
    )
  }

  return (
    <>
      <main className="flex flex-wrap gap-5">
        {profilePics.map((img) => (
          <div
            className={`flexC relative h-40 w-40 rounded-2xl md:h-[235px] md:w-[236px] ${img.key !== 'morePic' ? img.bgColor : 'order-1 border-4'}`}
            key={img.key}
          >
            {img.key !== 'morePic' && (
              <>
                {img.bgColor && (
                  <div className="flexC h-full w-full overflow-hidden">
                    <UseIcon
                      icon={img.icon}
                      className={`w-28 md:h-auto md:w-auto ${img.key === 'lady' || img.key === 'smeed' ? 'md:-mb-6' : ''}`}
                    />
                  </div>
                )}

                {!img.bgColor && (
                  <img
                    src={img.icon}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                )}

                <SelectedPicAndThreeDot
                  handleMoreIconClicked={handleMoreIconClicked}
                  data={img}
                  selectedImg={selectedImg === img.key}
                />

                <SelectAndDeletePic
                  data={img}
                  onSelect={handleMoreIconClicked}
                  selectedImg={selectedImg === img.key}
                />
              </>
            )}

            {img.key === 'morePic' && (
              <AddMorePic data={img} handleImagePicker={handleImagePicker} />
            )}
          </div>
        ))}
      </main>
    </>
  )
}
