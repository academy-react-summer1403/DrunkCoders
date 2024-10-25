import { useState } from 'react'

export function ImagePicker({ onChange }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file) // Read the file as a data URL for preview

      reader.onload = (event) => {
        onChange(file) // Set the selected image as a base64 string
      }
    }
  }

  return (
    <>
      <input
        type="file"
        id="img"
        className="hidden"
        onChange={handleImageChange}
        accept="image/jpeg,image/png,image/tiff,image/webp"
      />
    </>
  )
}
