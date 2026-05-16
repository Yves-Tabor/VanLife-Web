import React from "react"
import { Link, useLoaderData } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { getHostVans, getHostIncomeSummary, getHostReviewsSummary } from "../../api"
import requireAuth from "../../util"
import { useTheme } from "../../components/Theme"
import { hostTheme } from "../../util/hostTheme"

export async function loader({ request }) {
    try {
        await requireAuth(request)
        const vans = await getHostVans()
        const income = getHostIncomeSummary(vans)
        const reviews = getHostReviewsSummary(vans)
        return {
            vans,
            incomeTotal: income.total,
            averageRating: reviews.averageRating,
            reviewCount: reviews.count,
        }
    } catch (err) {
        if (err instanceof Response) throw err
        return { vans: [], incomeTotal: 0, averageRating: 0, reviewCount: 0 }
    }
}

export default function Dashboard() {
    const loaderData = useLoaderData()
    const { theme } = useTheme()
    const t = hostTheme(theme)

    console.log("Dashboard rendered, loaderData:", loaderData)

    if (!loaderData) return null

    const { vans = [], incomeTotal = 0, averageRating = 0, reviewCount = 0 } = loaderData

    console.log("vans:", vans, "incomeTotal:", incomeTotal)

    function renderVanElements(vans) {
        if (vans.length === 0) {
            return (
                <p className={t.muted}>
                    No listed vans yet.
                </p>
            )
        }
        return (
            <div className="flex flex-col gap-4">
                {vans.map((van) => (
                    <div
                        key={van.id}
                        className={`flex items-center justify-between rounded-md px-4 py-3 ${t.card}`}
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={van.imageUrl}
                                alt={`Photo of ${van.name}`}
                                className="w-16 h-16 rounded-md object-cover"
                            />
                            <div>
                                <h3 className={`font-bold text-lg ${t.heading}`}>
                                    {van.name}
                                </h3>
                                <p className="text-orange-500 font-semibold">
                                    ${van.price}
                                    <span className={`text-sm font-normal ${t.muted}`}>/day</span>
                                </p>
                            </div>
                        </div>
                        <Link
                            to={`vans/${van.id}`}
                            className={`text-sm font-semibold underline ${t.link}`}
                        >
                            View
                        </Link>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="px-[6%] md:px-[10%] py-8 md:py-10">

            <div className="flex flex-col md:flex-row gap-4 mb-8">

                <section className={`flex-1 rounded-md px-6 py-5 flex flex-col gap-1 ${t.card}`}>
                    <div className="flex items-baseline justify-between mb-1">
                        <h2 className={`text-xl font-bold ${t.heading}`}>Income</h2>
                        <p className={`text-sm ${t.muted}`}>
                            Last <span className="font-semibold underline">30 days</span>
                        </p>
                    </div>
                    <p className={`font-extrabold text-4xl ${t.heading}`}>
                        ${incomeTotal.toLocaleString()}
                    </p>
                    <Link
                        to="Income"
                        className={`text-sm font-semibold underline mt-2 ${t.link}`}
                    >
                        Details
                    </Link>
                </section>

                <section className={`flex-1 rounded-md px-6 py-5 flex flex-col gap-1 ${t.card}`}>
                    <div className="flex items-baseline justify-between mb-1">
                        <h2 className={`text-xl font-bold ${t.heading}`}>Review score</h2>
                        <p className={`text-sm ${t.muted}`}>
                            Last <span className="font-semibold underline">30 days</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <BsStarFill className="text-yellow-400 text-2xl" />
                        <p className={`font-extrabold text-4xl ${t.heading}`}>
                            {reviewCount > 0 ? averageRating.toFixed(1) : "—"}
                        </p>
                        <span className={`text-lg ${t.muted}`}>/5</span>
                    </div>
                    <Link
                        to="Reviews"
                        className={`text-sm font-semibold underline mt-2 ${t.link}`}
                    >
                        Details
                    </Link>
                </section>

            </div>

            <section>
                <div className={`flex items-baseline justify-between gap-2 mb-4 border-b pb-3 ${t.border}`}>
                    <h2 className={`text-lg md:text-xl font-bold ${t.heading}`}>
                        Your listed vans
                    </h2>
                    <Link to="vans" className={`text-sm font-semibold underline ${t.link}`}>
                        View all
                    </Link>
                </div>
                {renderVanElements(vans)}
            </section>

        </div>
    )
}
