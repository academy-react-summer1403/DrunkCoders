import React from 'react'

const Header = () => {
  return (
    <header className="border mt-2 flex justify-between items-center p-2">
    <div className="logo">
      logo
    </div>
    <div className="center flex-grow text-center">
      Navigation
    </div>
    <div className="text-right">
      left
    </div>
    </header>
  )
}

export {Header}
