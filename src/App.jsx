import { Routes, Route } from 'react-router-dom';
import NavBar from './pages/NavBar'
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'
import Vans from './pages/Vans'

export default function App(){
  return(
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Vans' element={<Vans/>}/>
        </Routes>
      </main>
    </div>
  )
}