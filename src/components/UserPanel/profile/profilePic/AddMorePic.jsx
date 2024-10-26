import { ImagePicker, UseIcon } from '@components/index'
import { addProfilePic } from '@core/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function AddMorePic({ data, handleImagePicker }) {
  const queryClient = useQueryClient()
  let toastId;

  const { mutate } = useMutation({
    mutationFn: addProfilePic,
    onMutate : () => {
      toastId = toast.loading('در حال بارگذاری');
    },
    onSuccess: (data) => {
      toast.dismiss(toastId);
      if (data.success) {
        queryClient.invalidateQueries(['userProfileInfo'])
        toast.success(' عکس با موفقیت ذخیره شد ')
      } else {
        toast.error(data.message || 'خطا در ذخیره‌سازی عکس');
      }
    },

  })
  

  function handleAddProfilePic(imageFile) {
    const fd = new FormData()
    fd.append('formFile', imageFile)
    mutate(fd)
  }

  return (
    <div>
      <ImagePicker onChange={handleAddProfilePic} />

      <label htmlFor="img" className="flexC cursor-pointer flex-col gap-1">
        <UseIcon
          icon={data.icon}
          className="scale-[2] stroke-1 text-primary-blue"
        />

        <p className="mt-4 font-medium"> اضافه کردن عکس </p>

        <p className="text-sm text-basic-gray">اندازه فریم ( 236*236 )</p>
      </label>
    </div>
  )
}
