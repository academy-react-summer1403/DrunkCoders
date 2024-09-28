import './App.css'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {

  return (
    <div className='h-screen flex-col min-h-screen p-5 mx-7'>
      <Header/>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default App;
