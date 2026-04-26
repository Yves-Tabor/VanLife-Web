import { Outlet } from 'react-router-dom'
import HostVanDetail from '../pages/host/HostVanDetail'

export default function HostVanLayout(){
    return(
        <>
            <HostVanDetail/>
            <nav className="host-nav flex space-x-[10%] p-5 bg-transparent md:space-x-[5%]">
                <NavLink
                    to="Details"
                    className={({isActive})=> isActive ? "font-semibold p-1 underline transition-all duration-300 ease-in-out" : "hover:underline font-normal py-1 px-2 transition-all duration-300 ease-in-out hover:text-orange-600"}
                >
                    Details
                </NavLink>
                
                <NavLink
                    to="Pricing"
                    className={({isActive})=> isActive ? "font-semibold p-1 underline transition-all duration-300 ease-in-out" : "hover:underline font-normal p-1 transition-all duration-300 ease-in-out hover:text-orange-600"}
                >
                    Pricing
                </NavLink>

                <NavLink
                    to="Photos"
                    className={({isActive})=> isActive ? "font-semibold p-1 underline transition-all duration-300 ease-in-out" : "hover:underline font-normal p-1 transition-all duration-300 ease-in-out hover:text-orange-600"}
                >
                    Photos
                </NavLink>
            </nav>
            <Outlet/>
        </>
    )
}