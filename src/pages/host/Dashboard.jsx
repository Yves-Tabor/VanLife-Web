import { Link, useLoaderData } from "react-router-dom"
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

    if (!loaderData) return null

    const { vans = [], incomeTotal = 0, averageRating = 0, reviewCount = 0 } = loaderData

    function renderVanElements(vans) {
        if (vans.length === 0) {
            return (
                <p className={t.muted}>
                    No rented vans yet. Browse the{" "}
                    <Link to="/Vans" className={t.link}>
                        catalog
                    </Link>{" "}
                    to rent one.
                </p>
            )
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vans.map((van) => (
                    <div
                        key={van.id}
                        className={`${t.panel} rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300`}
                    >
                        <img
                            src={van.imageUrl}
                            alt={`Photo of ${van.name}`}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className={`text-lg font-semibold mb-2 ${t.heading}`}>
                                {van.name}
                            </h3>
                            <p className="text-2xl font-bold text-orange-500">
                                \${van.price}
                                <span className={`text-sm font-normal ${t.muted}`}>
                                    /day
                                </span>
                            </p>
                        </div>
                        <Link
                            to={`vans/${van.id}`}
                            className="block w-full bg-orange-500 text-white text-center py-2 px-4 hover:bg-orange-600 transition-colors duration-200"
                        >
                            View
                        </Link>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
            <h1 className={`text-3xl font-bold mb-8 ${t.heading}`}>Host Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className={`${t.panel} rounded-lg p-6`}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className={`text-xl font-semibold ${t.heading}`}>Income</h2>
                        <span className={`text-sm ${t.muted}`}>Last 30 days</span>
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                        \${incomeTotal.toLocaleString()}
                    </div>
                    <Link to="Income" className={`inline-flex items-center mt-2 font-medium ${t.link}`}>
                        View Details →
                    </Link>
                </div>

                <div className={`${t.panel} rounded-lg p-6`}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className={`text-xl font-semibold ${t.heading}`}>Review Score</h2>
                        <div className="flex items-center">
                            <svg
                                className="text-yellow-400 mr-2 w-5 h-5 fill-current"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2l3.092 6.916L12 17.084l6.916-6.916L12 2z" />
                            </svg>
                            <span className={`text-2xl font-bold ${t.heading}`}>
                                {reviewCount > 0 ? averageRating.toFixed(1) : "—"}
                            </span>
                            <span className={t.muted}>/5</span>
                        </div>
                    </div>
                    <Link to="Reviews" className={`inline-flex items-center font-medium ${t.link}`}>
                        View Details →
                    </Link>
                </div>

                <div className={`${t.panel} rounded-lg p-6 lg:col-span-2`}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className={`text-xl font-semibold ${t.heading}`}>Your Rented Vans</h2>
                        <Link to="vans" className={`font-medium ${t.link}`}>
                            View All →
                        </Link>
                    </div>
                    {renderVanElements(vans)}
                </div>
            </div>
        </div>
    )
}
