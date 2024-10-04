import ShortLogo from '../../assets/logo/short-Logo.svg?react'
import LongLogo from '../../assets/logo/long-Logo.svg?react'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

export function AuthLayout({children, sideBar}) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth < 768 ? null : 'md')
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
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
        <main className="flex md:flex-row flex-col">
            <aside className="hidden md:flex flex-col md:w-6/12  md:bg-[#E4E4E4] md:h-screen order-1 md:order-none max-w-4xl">
                <div className="flex flex-col md:mt-[25%] md:mr-[10%] m-auto w-fit mt-12 pb-16">
                    <div className="md:flex items-center hidden cursor-pointer" onClick={handleClick} >
                        {windowWidth === 'md' && <ShortLogo className="w-[58px] h-[55px]" />}
                        <LongLogo className="w-[189px] h-[38px]" />
                    </div>

                    {sideBar && (
                        <div className="md:mt-8 ml-8  flex flex-col gap-8 text-sm text-gray-500">
                            {sideBar}
                        </div>
                    )}
                </div>
            </aside>

            <div className="w-full md:h-screen flex justify-center max-w-7xl">
                <div className="mt-[15%] mx-3 md:w-[530px] w-[90%]">
                    <div className=" md:hidden mb-8 cursor-pointer" onClick={handleClick}>
                        {console.log('Rendering ShortLogo')}
                        {windowWidth === null && <ShortLogo />}
                    </div>
                    {children}
                </div>
            </div>
        </main>
    )
}
