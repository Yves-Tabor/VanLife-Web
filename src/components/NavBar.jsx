import { useState, useEffect, useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import avatar from "../assets/images/avatar-icon.png"

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const isAuthenticated = localStorage.getItem('loggedin') === 'true'
    const navigate = useNavigate()
    const userPopupRef = useRef(null)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const handleLogout = () => {
        localStorage.setItem('loggedin', 'false')
        setShowUserPopup(false)
        navigate('/Login')
    }

    const toggleUserPopup = () => {
        setShowUserPopup(!showUserPopup)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userPopupRef.current && !userPopupRef.current.contains(event.target)) {
                setShowUserPopup(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <>
            <header className="bg-[#FEF6EA] h-30 p-7 top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <NavLink 
                            to="/" 
                            className={({isActive})=> isActive ? "w-1/4 flex items-center space-x-2 text-black font-bold text-xl hover:text-gray-700" : "w-1/4 flex items-center space-x-2 text-black font-bold text-xl hover:text-gray-700"}
                        >
                            <span className="text-2xl font-black">#VANLIFE</span>
                        </NavLink>
                        <div className="w-2/5 hidden md:flex justify-end items-center space-x-[15%]">
                            <NavLink 
                                to="/Login" 
                                className={({isActive})=> isActive ? "block text-black border-t-4 rounded-b-sm border-black shadow-lg px-4 py-2 hover:text-gray-600 font-medium flex items-center space-x-1" : "hidden border-t-4 rounded-b-sm border-transparent text-black hover:shadow-lg px-4 py-2 hover:text-gray-600 font-medium flex items-center space-x-1"}
                            >
                                <span>Login</span>
                            </NavLink>
                            <NavLink 
                                to={isAuthenticated ? "/Host" : "/login?You need to login befor you can access this page"}
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
                        <div className="hidden md:flex justify-end md:pl-[1%] lg:pl-[3%] relative">
                            {isAuthenticated ? (
                                <div className="relative" ref={userPopupRef}>
                                    <button 
                                        onClick={toggleUserPopup}
                                        className="hover:opacity-80 transition-opacity"
                                    >
                                        <img 
                                            src={avatar}
                                            alt="User Avatar"
                                            className="w-auto h-8 cursor-pointer"
                                        />
                                    </button>
                                    
                                    {showUserPopup && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                            <div className="p-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                                                >
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <img 
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-auto h-8 opacity-50"
                                />
                            )}
                        </div>

                        <button 
                            onClick={toggleMenu}
                            className="md:hidden bg-black border-t-4 border-black rounded-b-sm text-white px-3 py-1 hover:bg-gray-800 transition-colors"
                        >
                            <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
                        </button>
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div className="absolute top-0 z-60 md:hidden">
                    <div 
                        className="fixed inset-0 bg-transparent"
                        onClick={closeMenu}
                    />
                    
                    <div className="fixed right-0.5 top-9 h-75 w-55 bg-[#FEF6EA] shadow-xl rounded-b-md transform transition-transform duration-300 ease-in-out">
                        <div className="p-1 pr-[20%] flex">
                            <div className="w-1/2 md:flex justify-start px-6 py-1 items-center">
                                <NavLink to="/">
                                    <img 
                                        src={avatar}
                                        alt="Avatar"
                                        className="w-auto h-10"
                                    />
                                </NavLink>
                            </div>
                            <div className="flex  w-1/2 items-center justify-end">
                                <button 
                                    onClick={closeMenu}
                                    className="bg-black border-t-4 border-black rounded-b-sm text-white px-3 py-1 hover:bg-gray-800 transition-colors"
                                >
                                    <span className="text-2xl">✕</span>
                                </button>
                            </div>
                        </div>
                        
                        <nav className="p-4 space-y-2">
                            <NavLink 
                                to="/Login" 
                                onClick={closeMenu}
                                className={({isActive})=> isActive ? "block text-black border-t-4 rounded-b-sm border-black shadow-lg px-4 py-2 hover:text-gray-600 font-medium" : "hidden border-t-4 rounded-b-sm border-transparent text-black hover:shadow-lg px-4 py-2 hover:text-gray-600 font-medium"}
                            >
                                Login
                            </NavLink>

                            <NavLink 
                                to={isAuthenticated ? "/Host" : "/login?You need to login before you can access this page"}
                                onClick={closeMenu}
                                className={({isActive})=> isActive ? "block bg-black text-white border-t-4 rounded-b-sm border-orange-300 shadow-sm px-4 py-2 hover:text-gray-100 font-medium" : "block bg-black border-t-4 rounded-b-sm border-black text-white hover:shadow-md px-4 py-2 hover:text-gray-100 font-medium"}
                            >
                                Host
                            </NavLink>

                            <NavLink 
                                to="/About" 
                                onClick={closeMenu}
                                className={({isActive})=> isActive ? "block text-black border-t-4 rounded-b-sm border-black shadow-lg px-4 py-2 hover:text-gray-600 font-medium" : "block border-t-4 rounded-b-sm border-transparent text-black hover:shadow-lg px-4 py-2 hover:text-gray-600 font-medium"}
                            >
                                About
                            </NavLink>

                            <NavLink 
                                to="/Vans" 
                                onClick={closeMenu}
                                className={({isActive})=> isActive ? "block text-black border-t-4 rounded-b-sm border-black shadow-lg px-4 py-2 hover:text-gray-600 font-medium" : "block border-t-4 rounded-b-sm border-transparent text-black hover:shadow-lg px-4 py-2 hover:text-gray-600 font-medium"}
                            >
                                Vans
                            </NavLink>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}