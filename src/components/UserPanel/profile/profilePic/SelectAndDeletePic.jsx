import { CheckmarkCircle, Delete } from '@assets/index'
import { deleteProfilePic, selectProfilePic } from '@core/index'
import { Divider } from '@nextui-org/react'
import { darkModeActions } from '@store/dark-mode-slice'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

export function SelectAndDeletePic({ data, onSelect, selectedImg }) {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: selectProfilePic,
    onSuccess: (data) => {
      if (data.success) {
        dispatch(darkModeActions.setDefaultProfilePic(null))
        queryClient.invalidateQueries(['userProfileInfo'])
        console.log('success')
      } else {
        alert(data.message)
      }
    },
  })

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteProfilePic,
    onSuccess: (data) => {
      if (data.success) {
        if (selectedImg) {
          dispatch(darkModeActions.setDefaultProfilePic('hand'))
        }
        queryClient.invalidateQueries(['userProfileInfo'])
        console.log('success deletition')
      } else {
        alert(data.message)
      }
    },
  })

  function handleSelect() {
    if (data.bgColor) {
      dispatch(darkModeActions.setDefaultProfilePic(data.key))
    } else {
      const fd = new FormData()
      fd.append('ImageId', data.id)
      mutate(fd)
    }

    onSelect(data.key)
  }

  function handleDelete() {
    const fd = new FormData()
    fd.append('DeleteEntityId', data.id)
    deleteMutate(fd)
    onSelect(data.key)
  }

  return (
    <div
      className={`absolute top-20 z-10 w-56 rounded-2xl bg-slate-100 p-1 dark:bg-neutral-900 ${data.isMoreOpen ? '' : 'hidden'}`}
    >
      <div
        className="flex cursor-pointer items-center gap-3 p-3 transition-all hover:scale-105"
        onClick={handleSelect}
      >
        <CheckmarkCircle />
        انتخاب عکس اصلی
      </div>
      {!data.bgColor && (
        <>
          <Divider className="mx-auto w-[85%]" />

          <div
            onClick={handleDelete}
            className="flex cursor-pointer items-center gap-3 p-3 text-[#FF5454] transition-all hover:scale-105"
          >
            <Delete />
            حذف عکس
          </div>
        </>
      )}
    </div>
  )
}
