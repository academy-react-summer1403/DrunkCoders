import { Button } from '@components/index'
import { GoogleMapComponent } from './GoogleMapComponent'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { EditUserProfile } from '@core/index'
import { tokenActions } from '@store/index'
import toast from 'react-hot-toast'

export function Address({ userInfo }) {
  const [latlng, setLatlng] = useState()
  const dispatch = useDispatch()

  const { mutate } = useMutation({
    mutationFn: EditUserProfile,
    onSuccess: (data) => {
      toast.success(' اطلاعات موقعیت مکانی شما ثبت شد ')
      if (data.success) {
        if (data.newToken) {
          dispatch(tokenActions.login({ token: data.token, id: data.id }))
        }
      }
    },
  })

  function handleSetLatlng(latlng) {
    setLatlng(latlng)
  }

  function handleSubmitLocation() {
    if (!userInfo.fName) {
      alert('لطفا ابتدا اطلاعات شخصی را کامل بفرمایید')
      return
    }

    let newObject = {}

    if (userInfo.TelegramLink !== null) {
      newObject.TelegramLink = userInfo.telegramLink
      newObject.LinkdinProfile = userInfo.linkdinProfile
    }

    newObject = {
      ...newObject,
      LName: userInfo.lName,
      FName: userInfo.fName,
      UserAbout: userInfo.userAbout,
      HomeAdderess: userInfo.homeAdderess,
      NationalCode: userInfo.nationalCode,
      Gender: userInfo.gender,
      BirthDay: userInfo.birthDay,
      Latitude: latlng.lat,
      Longitude: latlng.lng,
    }

    const fd = new FormData()
    Object.keys(newObject).forEach((key) => {
      fd.append(key, newObject[key])
    })
    mutate(fd)
  }

  return (
    <div className="">
      <p className="mb-7 text-primary-blue">
        داخل نقشه موقعیت مکانی محل سکونت خود را انتخاب کنید
      </p>
      <div className="h-[400px] overflow-hidden rounded-2xl bg-[#D9D9D9]/20">
        <GoogleMapComponent
          onSelectLocation={handleSetLatlng}
          latlng={latlng}
        />
      </div>

      <Button onClick={handleSubmitLocation} className="mt-10 w-fit px-6 py-3">
        اعمال تغییرات
      </Button>
    </div>
  )
}
