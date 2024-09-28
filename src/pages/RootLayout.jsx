import {Outlet} from 'react-router-dom'
import {Header, Footer} from '../components/index'

export function RootLayout() {
    return (
        <div className="container mx-auto flex-col">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
