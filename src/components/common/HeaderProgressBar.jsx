import { Progress } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export function HeaderProgressBar() {
  //
  const [progress, setProgress] = useState(0)
  const [scrollingElement, setScrollingElement] = useState(null)

  useEffect(() => {
    const element =
      document.querySelector('.scrolling-element') || document.documentElement
    setScrollingElement(element)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollingElement.scrollTop

      const scrollHeight =
        scrollingElement.scrollHeight - scrollingElement.clientHeight

      // console.log(scrollHeight)
      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)

      setProgress(scrollPercentage)
    }

    scrollingElement?.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      scrollingElement?.removeEventListener('scroll', handleScroll)
    }
  }, [scrollingElement])

  // console.log(progress)

  return (
    <div className="w-full rounded-lg">
      <Progress
        size="sm"
        color="danger"
        aria-label="Loading..."
        value={progress}
        classNames={{ track: 'bg-transparent' }}
      />
    </div>
  )
}
