import React, { useState, useEffect } from 'react'
import { ArrowTop } from '@assets'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // نمایش دکمه وقتی کاربر به پایین صفحه اسکرول می‌کند
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // اسکرول به بالای صفحه
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // اسکرول نرم
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-10 flex h-16 w-16 justify-center rounded-full bg-blue-600 p-3 text-white shadow-lg transition-all hover:bg-blue-700"
        >
          <ArrowTop className="top-5" />
        </button>
      )}
    </div>
  )
}

export default BackToTop
