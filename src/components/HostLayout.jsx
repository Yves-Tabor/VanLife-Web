import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
export default function HostLayout(){
    return(
        <nav className="top-0 bg-transparent">
            <nav className="host-nav flex space-x-[10%] p-5 bg-transparent md:space-x-[5%]">
                <NavLink
                    to="Dashboard"
                    className={({isActive})=> isActive ? "font-semibold p-1 underline transition-all duration-300 ease-in-out" : "hover:underline font-normal py-1 px-2 transition-all duration-300 ease-in-out hover:text-orange-600"}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="income"
                    className={({isActive})=> isActive ? "font-semibold p-1 underline transition-all duration-300 ease-in-out" : "hover:underline font-normal p-1 transition-all duration-300 ease-in-out hover:text-orange-600"}
                >
                    Income
                </NavLink>
                
                <NavLink
                    to="vans"
                    className={({isActive})=> isActive ? "font-semibold p-1 underline transition-all duration-300 ease-in-out" : "hover:underline font-normal p-1 transition-all duration-300 ease-in-out hover:text-orange-600"}
                >
                    Vans
                </NavLink>

                <NavLink
                    to="reviews"
                    className={({isActive})=> isActive ? "font-semibold p-1 underline transition-all duration-300 ease-in-out" : "hover:underline font-normal p-1 transition-all duration-300 ease-in-out hover:text-orange-600"}
                >
                    Reviews
                </NavLink>

            </nav>
            <Outlet/>
        </nav>
    )
}
