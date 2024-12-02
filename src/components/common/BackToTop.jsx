import React, { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { BackToTopIcon } from '@assets/index'

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollingElement, setScrollingElement] = useState(null)

  useEffect(() => {
    const element =
      document.querySelector('.scrolling-element') || document.documentElement
    setScrollingElement(element)
  }, [])

  useEffect(() => {
    const toggleVisibility = () => {
      if (scrollingElement.scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    scrollingElement?.addEventListener('scroll', toggleVisibility)

    return () => {
      scrollingElement?.removeEventListener('scroll', toggleVisibility)
    }
  }, [scrollingElement])

  const scrollToTop = () => {
    scrollingElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          color="primary"
          radius="full"
          isIconOnly
          className="fixed bottom-8 right-8 z-50 h-16 w-16 shadow-lg"
        >
          <BackToTopIcon />
        </Button>
      )}
    </>
  )
}
