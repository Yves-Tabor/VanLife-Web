import { useParams, Link, Outlet, NavLink, useLoaderData } from "react-router-dom"
import React from 'react'
import { getHostVan } from '../../api'

export async function loader({ params }) {
    return getHostVan(params.id)
}

export default function HostVanDetail() {
    const currentVan = useLoaderData()
    
    return (
        <>
            <div className="bg-[#FEF6EA] w-[92%] flex flex-col pb-10 px-[6%]">
                <Link
                    to=".."
                    relative="path"
                    className="w-full mb-6 text-black hover:text-gray-800 flex items-start"
                >
                    <span className="mr-2">«</span><span className='underline'> Back to all vans</span>
                    </Link>
                <div className="w-full flex flex-col bg-white p-[4%]">

                    <div className="bg-transparent w-full flex flex-col md:flex-row p-[42] gap-[5%]">
                        <img 
                        src={currentVan.imageUrl} 
                        alt={`${currentVan.name} van`} 
                        className="w-full min-w-[200px] md:w-[30%] lg:max-w-[260px] md:w-[20%] h-auto rounded-md mb-6"
                        />

                        <div className="bg-transparent md:bg-white rounded-lg p-6 w-full md:w-[60%] lg:w-[50%]">
                            <p className="text-white w-fit py-2 px-4 bg-orange-600 hover:bg-orange-700 rounded-sm text-lg capitalize">
                                {currentVan.type}
                            </p>
                            <h1 className="text-3xl font-bold mb-4 mt-2">{currentVan.name}</h1>
                            
                            <p className="text-md font-semibold text-black"><span className="text-3xl">${currentVan.price}</span>/day</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <nav className="md:w-[50%] flex justify-start gap-[15%] pb-4">
                            <NavLink to="." end className={({ isActive }) => isActive ? "text-orange-600" : ""}>Details</NavLink>
                            <NavLink to="pricing" className={({ isActive }) => isActive ? "text-orange-600" : ""}>Pricing</NavLink>
                            <NavLink to="photos" className={({ isActive }) => isActive ? "text-orange-600" : ""}>Photos</NavLink>
                        </nav>
                        <Outlet context={{currentVan}}/>
                    </div>
                </div>
            </div>
       </>
    )
}