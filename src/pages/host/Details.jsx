import React from "react"
import {useOutletContext} from "react-router-dom"

export default function Details() {
    const {currentVan} = useOutletContext()
    
    return (
        <section className="">
            <h1 className="text-xl p-1">Infos</h1>
            <h4><span className="font-bold p-1">Category:</span> {currentVan.type}</h4>
            <h4><span className="font-bold p-1">Name:</span> {currentVan.name}</h4>
            <h4><span className="font-bold p-1">Description:</span> {currentVan.description}</h4>
            <h4><span className="font-bold p-1">Visibility:</span> Public</h4>
        </section>
    )
}
