import ShortLogo from '../../assets/logo/short-Logo.svg?react'
import LongLogo from '../../assets/logo/long-Logo.svg?react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function AuthLayout({ children, sideBar }) {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth < 768 ? null : 'md',
  )
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  useEffect(() => {
    window.addEventListener('resize', () => {
      const width = window.innerWidth
      if (width < 768) {
        setWindowWidth(null)
      } else {
        setWindowWidth('md')
      }
    })
  }, [])
  return (
    <main className="flex h-screen flex-col md:flex-row">
      <aside className="order-1 hidden max-w-4xl flex-col md:order-none md:flex md:h-screen md:w-6/12 md:bg-[#E4E4E4] dark:md:bg-slate-800">
        <div className="m-auto mt-12 flex w-fit flex-col pb-16 md:mr-[10%] md:mt-[25%]">
          <div
            className="hidden cursor-pointer items-center md:flex"
            onClick={handleClick}
          >
            {windowWidth === 'md' && (
              <ShortLogo className="h-[55px] w-[58px]" />
            )}
            <LongLogo className="h-[38px] w-[189px]" />
          </div>

          {sideBar && (
            <div className="ml-8 flex flex-col gap-8 text-sm text-gray-500 md:mt-8">
              {sideBar}
            </div>
          )}
        </div>
      </aside>

      <div className="flex w-full max-w-7xl justify-center md:h-screen">
        <div className="mx-3 mt-[15%] w-[90%] md:w-[530px]">
          <div className="mb-8 cursor-pointer md:hidden" onClick={handleClick}>
            {windowWidth === null && <ShortLogo />}
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}
