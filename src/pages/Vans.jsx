import React from 'react'
import { Link, useLoaderData, useSearchParams, useRouteError } from 'react-router-dom'
import getVans from '../api'
import { useTheme } from '../components/Theme'

export async function loader() {
    const vans = await getVans()
    return { vans }
}

export function VansError() {
    const error = useRouteError()
    const message =
        error?.message ||
        error?.statusText ||
        "Could not load vans. Check your connection and Firestore rules."

    return (
        <div className="p-8">
            <h2 className="text-xl font-bold text-red-600">Failed to load vans</h2>
            <p className="mt-2 text-gray-700">{message}</p>
        </div>
    )
}

export default function Vans() {
    const colors = ['#6b0909ff', '#4ECDC4', '#545f61ff', '#1eba71ff', '#a18a3eff', '#151515ff']
    const [searchParams, setSearchParams] = useSearchParams()
    const [isFiltered, setIsFiltered] = React.useState(false)
    const { theme } = useTheme()
    const typeFilter = searchParams.get('type')
    const { vans } = useLoaderData()

    const hoverColors = [
        'hover:bg-[#6b0909ff]',
        'hover:bg-[#4ECDC4]',
        'hover:bg-[#545f61ff]',
        'hover:bg-[#1eba71ff]',
        'hover:bg-[#a18a3eff]',
        'hover:bg-[#151515ff]',
    ]

    const randomHover1 = hoverColors[Math.floor(Math.random() * hoverColors.length)]
    const randomHover2 = hoverColors[Math.floor(Math.random() * hoverColors.length)]
    const randomHover3 = hoverColors[Math.floor(Math.random() * hoverColors.length)]

    const filteredVans = vans.filter((van) =>
        typeFilter ? van.type === typeFilter : true
    )

    return (
        <div className={`p-2 ${theme === 'light' ? 'bg-[#FEF6EA]' : 'bg-black'}`}>
            <h1 className={`text-2xl font-bold p-5 ${theme === 'dark' ? 'text-white' : ''}`}>
                Explore our van options
            </h1>

            {vans.length === 0 ? (
                <p className="p-5 text-gray-600">
                    No vans in the catalog yet. Run{" "}
                    <code className="bg-gray-100 px-1 rounded">npm run seed</code> in the
                    project folder, then refresh.
                </p>
            ) : (
                <>
                    <div className="w-full flex flex-col md:flex-row items-center justify-evenly p-[5%] md:p-[2%] gap-3 md:gap-0">
                        <div className="w-full md:w-2/3 flex justify-between md:justify-evenly text-white">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsFiltered(true)
                                    setSearchParams({ type: 'simple' })
                                }}
                                className={`bg-orange-400 px-2 py-1 rounded-sm ${isFiltered ? randomHover1 : ''}`}
                            >
                                Simple
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsFiltered(true)
                                    setSearchParams({ type: 'luxury' })
                                }}
                                className={`bg-orange-400 px-2 py-1 rounded-sm ${isFiltered ? randomHover2 : ''}`}
                            >
                                Luxury
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsFiltered(true)
                                    setSearchParams({ type: 'rugged' })
                                }}
                                className={`bg-orange-400 px-2 py-1 rounded-sm ${isFiltered ? randomHover3 : ''}`}
                            >
                                Rugged
                            </button>
                        </div>
                        <div>
                            {isFiltered && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsFiltered(false)
                                        setSearchParams({})
                                    }}
                                    className="border-black border-2 px-2 hover:bg-gray-200"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>

                    {filteredVans.length === 0 ? (
                        <p className="p-5 text-gray-600">No vans match this filter.</p>
                    ) : (
                        <ul className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full gap-6 p-[5%] md:p-[2%]">
                            {filteredVans.map((van) => (
                                <li
                                    key={van.id}
                                    className="md:w-[90%] bg-[#f0f0f0] rounded-md p-[10px] md:px-[6%] md:py-[1%]"
                                >
                                    <img
                                        src={van.imageUrl}
                                        alt={van.name}
                                        className="w-full h-auto rounded-md"
                                    />
                                    <h2 className="text-xl font-bold p-[3%] text-black">{van.name}</h2>
                                    <p className="text-lg ml-[1%] p-[2%] text-black">${van.price}/day</p>
                                    <Link
                                        to={`/Vans/${van.id}`}
                                        state={{
                                            search: searchParams.toString(),
                                            type: typeFilter,
                                        }}
                                    >
                                        <p
                                            className="flex items-center ml-[3%] justify-center text-[16px] py-2.5 px-6 font-semibold w-fit rounded-md text-white text-sm font-medium"
                                            style={{
                                                backgroundColor:
                                                    colors[Number(van.id) - 1] || colors[0],
                                            }}
                                        >
                                            {van.type}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    )
}
