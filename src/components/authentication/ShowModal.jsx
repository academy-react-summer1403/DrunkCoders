import React, { useState } from 'react'
import { LoginModal } from './LoginModal' // فرض کنید فایل بالا را در LoginModal.jsx ذخیره کرده‌اید
const ShowModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="App">
      {/* دکمه باز کردن مودال */}
      <button
        className="rounded-md bg-blue-500 px-6 py-3 text-white shadow-md"
        onClick={() => setIsModalOpen(true)}
      >
        ورود
      </button>

      {/* مودال لاگین */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default ShowModal
