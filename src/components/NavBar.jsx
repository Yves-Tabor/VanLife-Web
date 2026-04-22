import React from "react"
import { NavLink } from "react-router-dom"

export default function NavBar() {

    return (
        <header className="bg-[#FEF6EA] h-30 p-7 top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <NavLink 
                        to="/" 
                        className={({isActive})=> isActive ? "flex items-center space-x-2 text-black font-bold text-xl hover:text-gray-700" : "flex items-center space-x-2 text-black font-bold text-xl hover:text-gray-700"}
                    >
                        <span className="text-2xl font-black">#VANLIFE</span>
                    </NavLink>

                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink 
                            to="/Login" 
                            className={({isActive})=> isActive ? "text-black border-t-4 rounded-b-sm border-black shadow-lg px-4 py-2 hover:text-gray-600 font-medium flex items-center space-x-1" : "border-t-4 rounded-b-sm border-transparent text-black hover:shadow-lg px-4 py-2 hover:text-gray-600 font-medium flex items-center space-x-1"}
                        >
                            <span>Login</span>
                        </NavLink>
                        <NavLink 
                            to="/Host"
                            className={({isActive})=> isActive ? "bg-black text-white border-t-4 rounded-b-sm border-orange-300 shadow-sm px-4 py-2 hover:text-gray-100 font-medium flex items-center space-x-1" : "bg-black border-t-4 rounded-b-sm border-black text-white hover:shadow-md px-4 py-2 hover:text-gray-100 font-medium flex items-center space-x-1"}
                         >   Host
                        </NavLink>
                    </div>
 
                    <nav className="hidden md:flex space-x-8">
                        <NavLink 
                            to="/About" 
                            className={({isActive})=> isActive ? "text-black border-t-4 rounded-b-sm border-black shadow-lg px-4 py-2 hover:text-gray-600 font-medium flex items-center space-x-1" : "border-t-4 rounded-b-sm border-transparent text-black hover:shadow-lg px-4 py-2 hover:text-gray-600 font-medium flex items-center space-x-1"}
                        >
                            About
                        </NavLink>
                        <NavLink 
                            to="/Vans" 
                            className={({isActive})=> isActive ? "text-black border-t-4 rounded-b-sm border-black shadow-lg px-4 py-2 hover:text-gray-600 font-medium flex items-center space-x-1" : "border-t-4 rounded-b-sm border-transparent text-black hover:shadow-lg px-4 py-2 hover:text-gray-600 font-medium flex items-center space-x-1"}
                        >
                            Vans
                        </NavLink>
                    </nav>
                    <div id='menu' className="md:hidden bg-black border-t-4 border-black rounded-b-sm text-white                                                                                                                                                                                                                                                 px-3 py-1"> <span className="text-2xl">☰</span> </div>
                </div>
            </div>
        </header>
    )
}