import { useState, useEffect, useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { useTheme } from "./Theme"
import { auth } from "../firebase"
import { logoutUser } from "../api"

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userInitial, setUserInitial] = useState("")
    const navigate = useNavigate()
    const userPopupRef = useRef(null)
    const mobileUserPopupRef = useRef(null)
    const { theme, toggleTheme } = useTheme()

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const closeMenu = () => setIsMenuOpen(false)

    const handleLogout = async () => {
        await logoutUser()
        setShowUserPopup(false)
        closeMenu()
        navigate("/Login")
    }

    const toggleUserPopup = () => setShowUserPopup(!showUserPopup)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(Boolean(user))
            if (user?.email) {
                setUserInitial(user.email.charAt(0).toUpperCase())
            } else {
                setUserInitial("")
            }
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userPopupRef.current && !userPopupRef.current.contains(event.target) &&
                mobileUserPopupRef.current && !mobileUserPopupRef.current.contains(event.target)
            ) {
                setShowUserPopup(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const AvatarButton = ({ refProp, className = "" }) => (
        <div className={`relative ${className}`} ref={refProp}>
            {isAuthenticated ? (
                <>
                    <button
                        onClick={toggleUserPopup}
                        className="w-8 h-8 rounded-full border-2 border-black dark:border-white flex items-center justify-center bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:opacity-80 transition-opacity"
                    >
                        {userInitial}
                    </button>
                    {showUserPopup && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-sm shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                            <div className="p-2">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm flex items-center space-x-2 transition-colors"
                                >
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center opacity-40">
                    <span className="text-gray-400 dark:text-gray-500 text-sm font-bold">?</span>
                </div>
            )}
        </div>
    )

    return (
        <>
            <header className={theme !== 'light' ? 'bg-[#FEF6EA] dark:bg-black border-b border-transparent dark:border-gray-800 h-30 p-7 top-0 z-50 transition-colors duration-300' : 'bg-[#FEF6EA] border-b border-transparent h-30 p-7 top-0 z-50 transition-colors duration-300'}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        <NavLink
                            to="/"
                            className="w-1/4 flex items-center space-x-2 text-gray-500 dark:text-gray-300 font-bold text-xl hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
                        >
                            <span className="text-2xl font-black">#VANLIFE</span>
                        </NavLink>

                        <div className="w-2/5 hidden md:flex justify-end items-center space-x-[15%]">
                            <NavLink
                                to="/Login"
                                className={({ isActive }) => isActive
                                    ? `${theme === 'light' ? 'block text-black border-t-4 bg-white rounded-b-sm border-transparent shadow-sm px-4 py-2 font-medium flex items-center space-x-1 transition-colors' : 'block bg-white text-black border-t-4 rounded-b-sm border-orange-300 shadow-sm px-4 py-2 font-medium flex items-center space-x-1 transition-colors'}`
                                    : 'hidden border-t-4 rounded-b-sm border-transparent text-black dark:text-gray-200 hover:shadow-lg px-4 py-2 hover:text-gray-600 dark:hover:text-gray-400 font-medium flex items-center space-x-1 transition-colors'}
                            >
                                <span>Login</span>
                            </NavLink>
                            <NavLink
                                to={isAuthenticated ? "/Host" : "/Login?message=You%20must%20log%20in%20to%20access%20the%20host%20area."}
                                className={({ isActive }) => isActive
                                    ? "bg-black text-white border-t-4 rounded-b-sm border-orange-300 shadow-sm px-4 py-2 hover:text-gray-100 font-medium flex items-center space-x-1 dark:bg-gray-800"
                                    : "bg-black border-t-4 rounded-b-sm border-black text-white hover:shadow-md px-4 py-2 hover:text-gray-100 font-medium flex items-center space-x-1 dark:bg-gray-800 dark:border-gray-600"}
                            >
                                Host
                            </NavLink>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            <NavLink
                                to="/About"
                                className={({ isActive }) => isActive
                                    ? `${theme === 'light' ? 'text-black border-t-4 bg-[#FEF6EA] border-t-[#FFB86A] rounded-b-sm shadow-sm px-4 py-2 font-medium flex items-center space-x-1 transition-colors' : 'text-black border-t-4 bg-[#FEF6EA] border-t-[#FFB86A] rounded-b-sm shadow-sm px-4 py-2 font-medium flex items-center space-x-1 transition-colors'}`
                                    : `${theme === 'light' ? 'text-black bg-[#FEF6EA] font-bold border-t-4 rounded-b-sm border-transparent hover:shadow-sm px-4 py-2 font-medium flex items-center space-x-1 transition-colors' : 'text-white bg-transparent font-bold border-t-4 rounded-b-sm border-transparent hover:shadow-sm px-4 py-2 font-medium flex items-center space-x-1 transition-colors'}`}
                            >
                                About
                            </NavLink>
                            <NavLink
                                to="/Vans"
                                className={({ isActive }) => isActive
                                    ? `${theme === 'light' ? 'text-black border-t-4 bg-[#FEF6EA] border-t-[#FFB86A] rounded-b-sm shadow-sm px-4 py-2 font-medium flex items-center space-x-1 transition-colors' : 'text-black border-t-4 bg-[#FEF6EA] border-t-[#FFB86A] rounded-b-sm shadow-sm px-4 py-2 font-medium flex items-center space-x-1 transition-colors'}`
                                    : `${theme === 'light' ? 'text-black bg-[#FEF6EA] font-bold border-t-4 rounded-b-sm border-transparent hover:shadow-sm px-4 py-2 font-medium flex items-center space-x-1 transition-colors' : 'text-white bg-transparent font-bold border-t-4 rounded-b-sm border-transparent hover:shadow-sm px-4 py-2 font-medium flex items-center space-x-1 transition-colors'}`}
                            >
                                Vans
                            </NavLink>
                        </nav>

                        <div className="hidden md:flex justify-end md:pl-[1%] lg:pl-[3%] relative items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-black dark:text-white"
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? '🌙' : '☀️'}
                            </button>
                            <AvatarButton refProp={userPopupRef} />
                        </div>

                        <div className="md:hidden flex items-center space-x-2">
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-2xl text-black dark:text-white"
                            >
                                {theme === 'light' ? '🌙' : '☀️'}
                            </button>
                            <button
                                onClick={toggleMenu}
                                className="bg-black border-t-4 border-black rounded-b-sm text-white px-3 py-1 hover:bg-gray-800 transition-colors dark:bg-gray-800 dark:border-gray-600"
                            >
                                <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
                            </button>
                        </div>

                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div className="absolute top-0 z-60 md:hidden">
                    <div className="fixed inset-0 bg-transparent" onClick={closeMenu} />

                    <div className={theme === 'light'
                        ? "fixed right-0.5 top-9 h-fit w-55 bg-[#FEF6EA] border border-transparent shadow-sm rounded-b-sm transform transition-transform duration-300 ease-in-out"
                        : "fixed right-0.5 top-9 h-fit w-55 bg-black border border-gray-800 shadow-xl rounded-b-md transform transition-transform duration-300 ease-in-out"}>

                        <div className="p-1 pr-[20%] flex items-center">
                            <div className="w-1/2 flex justify-start px-6 py-1 items-center">
                                <AvatarButton refProp={mobileUserPopupRef} />
                            </div>
                            <div className="flex w-1/2 items-center justify-end">
                                <button
                                    onClick={closeMenu}
                                    className="bg-black border-t-4 border-black rounded-b-sm text-white px-3 py-1 hover:bg-gray-800 transition-colors dark:bg-gray-800 dark:border-gray-600"
                                >
                                    <span className="text-2xl">✕</span>
                                </button>
                            </div>
                        </div>

                        <nav className="p-4 space-y-2">
                            <NavLink
                                to="/Login"
                                onClick={closeMenu}
                                className={({ isActive }) => isActive
                                    ? "block text-black dark:text-white border-t-4 rounded-b-sm border-black dark:border-white shadow-lg px-4 py-2 hover:text-gray-600 dark:hover:text-gray-300 font-medium"
                                    : "block border-t-4 rounded-b-sm border-transparent text-gray-600 dark:text-gray-300 hover:shadow-lg px-4 py-2 hover:text-black dark:hover:text-white font-medium"}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to={isAuthenticated ? "/Host" : "/Login?message=You%20must%20log%20in%20to%20access%20the%20host%20area."}
                                onClick={closeMenu}
                                className={({ isActive }) => isActive
                                    ? "block bg-black text-white border-t-4 rounded-b-sm border-orange-300 shadow-sm px-4 py-2 hover:text-gray-100 font-medium dark:bg-gray-800"
                                    : "block bg-black border-t-4 rounded-b-sm border-black text-white hover:shadow-md px-4 py-2 hover:text-gray-100 font-medium dark:bg-gray-800 dark:border-gray-600"}
                            >
                                Host
                            </NavLink>
                            <NavLink
                                to="/About"
                                onClick={closeMenu}
                                className={({ isActive }) => isActive
                                    ? "block text-black dark:text-white border-t-4 rounded-b-sm border-black dark:border-white shadow-lg px-4 py-2 hover:text-gray-600 dark:hover:text-gray-300 font-medium"
                                    : "block border-t-4 rounded-b-sm border-transparent text-gray-600 dark:text-gray-300 hover:shadow-lg px-4 py-2 hover:text-black dark:hover:text-white font-medium"}
                            >
                                About
                            </NavLink>
                            <NavLink
                                to="/Vans"
                                onClick={closeMenu}
                                className={({ isActive }) => isActive
                                    ? "block text-black dark:text-white border-t-4 rounded-b-sm border-black dark:border-white shadow-lg px-4 py-2 hover:text-gray-600 dark:hover:text-gray-300 font-medium"
                                    : "block border-t-4 rounded-b-sm border-transparent text-gray-600 dark:text-gray-300 hover:shadow-lg px-4 py-2 hover:text-black dark:hover:text-white font-medium"}
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
