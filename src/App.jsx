import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'
import Vans from './pages/Vans'
import VanDetail from './pages/VanDetail'
import Layout from './components/Layout'
import HostLayout from './components/HostLayout'
import Dashboard from './pages/host/Dashboard'
import Income from './pages/host/Income'
import Reviews from './pages/host/Reviews'
import HostVans from './pages/host/HostVans'
import HostVanDetail from './pages/host/HostVanDetail'

export default function App(){
  return(
    <div className="min-h-screen flex flex-col bg-[#FEF6EA]">
      <main className="">
        <Routes>
          <Route element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path='/About' element={<About/>}/>
              <Route path='/Login' element={<Login/>}/>
              <Route path='/Vans' element={<Vans/>}/>
              <Route path='/Vans/:id' element={<VanDetail/>}/>
              <Route path='Host' element={<HostLayout/>}>
                <Route path='Dashboard' element={<Dashboard/>}/>
                <Route path='Income' element={<Income/>}/>
                <Route path='Reviews' element={<Reviews/>}/>
                <Route path='vans' element={<HostVans/>}/>
                <Route path=':id' element={<HostVans/>}/>
              </Route>
          </Route>
        </Routes>
      </main>
    </div>
  )
}