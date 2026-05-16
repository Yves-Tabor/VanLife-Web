import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Home from './pages/Home'
import Login, {loader as loginLoader, action as loginAction} from './pages/Login'
import Vans, { loader as vansLoader, VansError } from './pages/Vans'
import VanDetail, { loader as vanDetailLoader, action as vanDetailAction } from './pages/VanDetail'
import HostLayout from './components/HostLayout'
import Dashboard, { loader as dashboardLoader } from './pages/host/Dashboard'
import Income, { loader as incomeLoader } from './pages/host/Income'
import Reviews, { loader as reviewsLoader } from './pages/host/Reviews'
import HostVans, { loader as hostVansLoader } from './pages/host/HostVans'
import Details from './pages/host/Details'
import Pricing from './pages/host/Pricing'
import Photos from './pages/host/Photos'
import HostVanDetail, { loader as hostVanDetailLoader } from './pages/host/HostVanDetail'
import NotFound from './pages/NotFound'
import Error from './components/Error'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "About", element: <About /> },
      { path: "Login", element: <Login />, loader: loginLoader, action: loginAction },
      { path: "Vans", element: <Vans />, loader: vansLoader, errorElement: <VansError /> },
      { path: "Vans/:id", element: <VanDetail />, loader: vanDetailLoader, action: vanDetailAction },
      {
        path: "Host",
        element: <HostLayout />,
        children: [
          { index: true, element: <Dashboard />, loader: dashboardLoader },
          { path: "Income", element: <Income />, loader: incomeLoader },
          { path: "vans", element: <HostVans />, loader: hostVansLoader, errorElement: <Error /> },
          {
            path: "vans/:id",
            element: <HostVanDetail />,
            loader: hostVanDetailLoader,
            children: [
              { index: true, element: <Details /> },
              { path: "pricing", element: <Pricing /> },
              { path: "photos", element: <Photos /> },
            ],
          },
          { path: "Reviews", element: <Reviews />, loader: reviewsLoader },
        ],
      },
      { path: "*", element: <NotFound /> }
    ]
  }
])
