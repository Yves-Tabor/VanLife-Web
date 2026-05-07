import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Home from './pages/Home'
import Login, {loader as loginLoader, action as loginAction} from './pages/Login'
import Vans, { loader as vansLoader } from './pages/Vans'
import VanDetail, { loader as vanDetailLoader } from './pages/VanDetail'
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

console.log("Router is being created");
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "About",
        element: <About />
      },
      {
        path: "Login",
        element: <Login />,
        loader: loginLoader,
        action: loginAction
      },
      {
        path: "Vans",
        element: <Vans />,
        loader: vansLoader,
        errorElement: <Error />
      },
      {
        path: "Vans/:id",
        element: <VanDetail />,
        loader: vanDetailLoader
      },
      {
        path: "Host",
        element: <HostLayout />,
        loader: async () => await requireAuth(),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            loader: async () => await requireAuth()
          },
          {
            path: "Income",
            element: <Income />,
            loader: async () => await requireAuth()
          },
          {
            path: "vans",
            element: <HostVans />,
            loader: hostVansLoader,
            errorElement: <Error />
          },
          {
            path: "vans/:id",
            element: <HostVanDetail />,
            loader: hostVanDetailLoader,
            children: [
              {
                index: true,
                element: <Details />
              },
              {
                path: "pricing",
                element: <Pricing />
              },
              {
                path: "photos",
                element: <Photos />
              }
            ]
          },
          {
            path: "Reviews",
            element: <Reviews />
          }
        ]
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])
