import { Outlet } from 'react-router-dom'
import { Header, Footer, LoginModal, HeaderProgressBar } from '@components/index'
// import { useDisclosure } from '@nextui-org/react'

export function RootLayout() {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className="no-scrollbar mx-auto h-screen flex-col overflow-x-hidden px-3 md:px-6 lg:px-12">
      {/* <LoginModal onClose={onOpen} isOpen={false} /> */}
      <Header />
      {/* <div className='sticky top-24 z-50'>
       <HeaderProgressBar /> 
      </div> */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
