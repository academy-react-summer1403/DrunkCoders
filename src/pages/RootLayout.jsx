import { Outlet } from 'react-router-dom'
import { Header, Footer } from '@components'

export function RootLayout() {
  return (
    <div className="mx-auto flex-col overflow-hidden px-3 md:px-6 lg:px-12">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
