import React from "react"
import { Link, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import requireAuth from "../../util"

export async function loader({ request }) {
    await requireAuth(request)
    try {
        const vans = await getHostVans()
        return { vans }
    } catch {
        return { vans: [] }
    }
}

export default function Dashboard() {
    const loaderData = useLoaderData()

    function renderVanElements(vans) {
        const hostVansEls = vans.map((van) => (
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{van.name}</h3>
                    <p className="text-2xl font-bold text-orange-500">${van.price}<span className="text-sm text-gray-600">/day</span></p>
                </div>
                <Link 
                    to={`vans/${van.id}`} 
                    className="block w-full bg-orange-500 text-white text-center py-2 px-4 hover:bg-orange-600 transition-colors duration-200"
                >
                    View
                </Link>
            </div>
        ))

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hostVansEls}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Host Dashboard</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Income</h2>
                            <span className="text-sm text-gray-500">Last 30 days</span>
                        </div>
                        <div className="text-3xl font-bold text-green-600">$2,260</div>
                        <Link 
                            to="income" 
                            className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
                        >
                            View Details →
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Review Score</h2>
                            <div className="flex items-center">
                                <svg className="text-yellow-400 mr-2 w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.092 6.916L12 17.084l6.916-6.916L12 2z"/>
                                </svg>
                                <span className="text-2xl font-bold text-gray-900">5.0</span>
                                <span className="text-gray-500">/5</span>
                            </div>
                        </div>
                        <Link 
                            to="reviews" 
                            className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
                        >
                            View Details →
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Your Rented Vans</h2>
                            <Link 
                                to="vans" 
                                className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
                            >
                                View All →
                            </Link>
                        </div>
                        {renderVanElements(loaderData?.vans || [])}
                    </div>
                </div>
            </div>
        </div>
    )
}