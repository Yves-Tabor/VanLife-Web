import { Link, Outlet, NavLink, useLoaderData } from "react-router-dom"
import { getHostVan } from "../../api"
import { useTheme } from "../../components/Theme"
import { hostTheme } from "../../util/hostTheme"

export async function loader({ params }) {
    return getHostVan(params.id)
}

export default function HostVanDetail() {
    const currentVan = useLoaderData()
    const { theme } = useTheme()
    const t = hostTheme(theme)

    const tabClass = ({ isActive }) =>
        isActive
            ? "text-orange-600 font-semibold"
            : theme === "light"
              ? "text-gray-700 hover:text-orange-600"
              : "text-gray-300 hover:text-orange-400"

    return (
        <div className="w-[92%] flex flex-col pb-10 px-[6%]">
            <Link
                to=".."
                relative="path"
                className={`w-full mb-6 flex items-start hover:opacity-80 ${t.heading}`}
            >
                <span className="mr-2">«</span>
                <span className="underline">Back to all vans</span>
            </Link>

            <div className={`w-full flex flex-col p-[4%] rounded-lg ${t.panel}`}>
                <div className="w-full flex flex-col md:flex-row gap-[5%] p-4 md:p-8">
                    <img
                        src={currentVan.imageUrl}
                        alt={`${currentVan.name} van`}
                        className="w-full min-w-[200px] md:w-[30%] lg:max-w-[260px] h-auto rounded-md"
                    />

                    <div className="rounded-lg p-6 w-full md:w-[60%] lg:w-[50%]">
                        <p className="text-white w-fit py-2 px-4 bg-orange-600 rounded-sm text-lg capitalize">
                            {currentVan.type}
                        </p>
                        <h1 className={`text-3xl font-bold mb-4 mt-2 ${t.heading}`}>
                            {currentVan.name}
                        </h1>
                        <p className={`text-md font-semibold ${t.body}`}>
                            <span className="text-3xl">${currentVan.price}</span>/day
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 px-4 pb-4">
                    <nav className="md:w-[50%] flex justify-start gap-[15%] pb-4">
                        <NavLink to="." end className={tabClass}>
                            Details
                        </NavLink>
                        <NavLink to="pricing" className={tabClass}>
                            Pricing
                        </NavLink>
                        <NavLink to="photos" className={tabClass}>
                            Photos
                        </NavLink>
                    </nav>
                    <Outlet context={{ currentVan }} />
                </div>
            </div>
        </div>
    )
}
