import React from "react"
import { Link, Outlet, useLoaderData, defer, Await } from "react-router-dom"
import { getHostVans } from "../../api"
import requireAuth from "../../util"
import { useTheme } from "../../components/Theme"
import { hostTheme } from "../../util/hostTheme"

export async function loader({ request }) {
    await requireAuth(request)
    return defer({ hostVans: getHostVans() })
}

export default function HostVans() {
    const { hostVans } = useLoaderData()
    const { theme } = useTheme()
    const t = hostTheme(theme)

    function renderHostVans(vans) {
        if (vans.length === 0) {
            return (
                <p className={`${t.muted} text-sm md:text-base max-w-md`}>
                    You have not rented any vans yet. Browse the{" "}
                    <Link to="/Vans" className={`${t.link} font-medium hover:underline`}>
                        van catalog
                    </Link>{" "}
                    and click <strong>Rent the van</strong> to add one here.
                </p>
            )
        }

        return vans.map((hostVan) => (
            <Link
                to={`${hostVan.id}`}
                key={hostVan.id}
                className={`flex min-w-[290px] w-[88%] md:w-[88%] gap-[8%] md:gap-[3%] rounded-md p-[8px] md:px-[6%] md:py-[1%] ${t.vanRow}`}
            >
                <img
                    src={hostVan.imageUrl}
                    alt={hostVan.name}
                    className="min-w-20 w-[20%] h-auto rounded-md md:w-[18%] lg:w-[15%] md:h-auto"
                />
                <div className="flex flex-col w-[60%]">
                    <h2 className={`text-md md:text-xl font-semibold md:font-bold p-[2%] w-full ${t.heading}`}>
                        {hostVan.name}
                    </h2>
                    <p className={`text-sm ml-[1%] p-[2%] md:text-lg ${t.body}`}>
                        <span className="text-2xl font-bold">${hostVan.price}</span>/day
                    </p>
                </div>
            </Link>
        ))
    }

    return (
        <div className="p-2">
            <div className="flex flex-col w-full space-y-[7%] md:space-y-[4%] items-start pl-[5%] md:pl-[10%]">
                <h2 className={`text-xl md:text-3xl font-bold justify-start border-b-2 pb-1 ${t.borderStrong} ${t.heading}`}>
                    Your rented vans
                </h2>
                <React.Suspense fallback={<div className={t.muted}>Loading...</div>}>
                    <Await resolve={hostVans}>{renderHostVans}</Await>
                </React.Suspense>
            </div>
            <Outlet />
        </div>
    )
}
