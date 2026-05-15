import { NavLink, Outlet } from "react-router-dom"
import { useTheme } from "./Theme"
import { hostNavClass, hostTheme } from "../util/hostTheme"

export default function HostLayout() {
    const { theme } = useTheme()
    const t = hostTheme(theme)

    return (
        <div className={t.page}>
            <nav className="host-nav flex justify-evenly md:w-[50%] p-5 bg-transparent md:space-x-[5%]">
                <NavLink
                    to="."
                    end
                    className={({ isActive }) => hostNavClass(theme, isActive)}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="Income"
                    className={({ isActive }) => hostNavClass(theme, isActive)}
                >
                    Income
                </NavLink>
                <NavLink
                    to="vans"
                    className={({ isActive }) => hostNavClass(theme, isActive)}
                >
                    Vans
                </NavLink>
                <NavLink
                    to="Reviews"
                    className={({ isActive }) => hostNavClass(theme, isActive)}
                >
                    Reviews
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}
