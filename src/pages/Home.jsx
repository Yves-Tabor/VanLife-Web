import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full home-container h-full flex flex-col p-2 items-start justify-start gap-6 md:w-6/7">
                <h1 className='font-bold text-3xl'>You got the travel plans, we got the travel vans.</h1>
                <p className="text-md">Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
                <Link to="/Vans" className="bg-black hover:bg-gray-800 py-2 px-4 text-white rounded-sm">Find your van</Link>
            </div>
        </div>
    )
};