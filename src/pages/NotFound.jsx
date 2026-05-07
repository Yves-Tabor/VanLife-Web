import React from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="not-found-container flex flex-col items-center space-y-[10%] p-[20%] md:p-[7%]">
            <h1 className="font-semibold text-2xl">Sorry, the page you were looking for was not found.</h1>
            <Link to="/" className="link-button w-full py-3 px-5 bg-black text-white rounded-sm flex items-center justify-center md:w-auto ">Return to Home</Link>
        </div>
    )
}

// Heyyyy,
// I just used @netlify to deploy a React Project - I've been building through my React Router learning journey - to the World Wide Web.
// It's a travel van rental app built while following @scrimba's Advanced React Course.
// Check out now how it's coming along: link
// #100DaysOfCode #Coding