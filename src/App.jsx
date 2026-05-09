import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import About from './pages/About'
import Home from './pages/Home'
import Login, {loader as loginLoader, action as loginAction} from './pages/Login'
import Vans, { loader as vansLoader } from './pages/Vans'
import VanDetail, { loader as vanDetailLoader } from './pages/VanDetail'
import Layout from './components/Layout'
import HostLayout from './components/HostLayout'
import Dashboard from './pages/host/Dashboard'
import Income from './pages/host/Income'
import Reviews from './pages/host/Reviews'
import HostVans, { loader as hostVansLoader } from './pages/host/HostVans'
import Details from './pages/host/Details'
import Pricing from './pages/host/Pricing'
import Photos from './pages/host/Photos'
import HostVanDetail, { loader as hostVanDetailLoader } from './pages/host/HostVanDetail'
import NotFound from './pages/NotFound' 
import Error from './components/Error'
import requireAuth from './util'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  redirect
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>} loader={async()=>{
                return null;
              }}/>
              <Route path='About' element={<About/>}/>
              <Route path='Login' element={<Login/>} loader={loginLoader} action={loginAction}/>
              <Route path='Vans' element={<Vans/>} errorElement={<Error/>} loader={vansLoader}/>
              <Route path='Vans/:id' element={<VanDetail/>} loader={vanDetailLoader}/>
              <Route path='Host' element={<HostLayout/>} loader={async({request})=> await requireAuth(request)}>
                <Route path='dashboard' element={<Dashboard/>} loader={async({request})=> await requireAuth(request)}/>
                <Route path='Income' element={<Income/>} />
                <Route path='vans' element={<HostVans/>} loader={async({request})=> {
                  await requireAuth(request)
                  return hostVansLoader
                  }}
                  errorElement={<Error/>}/>
                <Route path='vans/:id' element={<HostVanDetail/>} loader={hostVanDetailLoader}>
                  <Route index element={<Details/>}/>
                  <Route path='pricing' element={<Pricing/>}/>
                  <Route path='photos' element={<Photos/>}/>
                
                </Route>
                <Route path='Reviews' element={<Reviews/>}/>
              </Route>
              <Route path='*' element={<NotFound/>}/>
    </Route>
  ),
  {
    hydrateFallback: <div>Loading...</div>
  }
)

export { router }
export default function App(){
  return (
    <RouterProvider router={router} />
  )
}