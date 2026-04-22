import { useParams } from "react-router-dom"
import React from 'react'
import { Link } from 'react-router-dom'

function VanDetail() {
    const { id } = useParams()
    const [van, setVan] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        fetch(`/api/vans/${id}`)
            .then(res => res.json())
            .then(data => {
                setVan(data.vans)
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching van detail:", err)
                setError(err.message)
                setLoading(false)
            })
    }, [id])

    if (loading) return <div className="text-center p-8">Loading van details...</div>
    if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>

    return (
        <>
            <div className="bg-[#FEF6EA] w-full flex flex-col items-center min-h-screen">
                <div className="container mx-auto px-4 py-8 w-[85%] flex flex-col items-center justify-center">
                    <Link to="/Vans" className="w-full mb-6 text-black hover:text-gray-800 flex items-start">
                        <span className="mr-2">«</span><span className='hover:underline'> Back to all vans</span>
                    </Link>

                    <img 
                        src={van.imageUrl} 
                        alt={`${van.name} van`} 
                        className="w-full md:w-[60%] lg:w-[50%] h-auto rounded-md mb-6"
                    />

                    <div className="bg-white rounded-lg p-6 shadow-md w-full md:w-[60%] lg:w-[50%]">
                        <p className="text-black w-fit py-2 px-4 bg-orange-100 text-lg capitalize">
                            {van.type}
                        </p>
                        <h1 className="text-3xl font-bold mb-4 mt-2">{van.name}</h1>
                        
                        <p className="text-md font-semibold text-black">${van.price}/day</p>
                        

                        <div className="pt-4">
                            <h2 className="text-xl font-semibold mb-3">Description</h2>
                            <p className="text-gray-600 leading-relaxed">{van.description}</p>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <button className="bg-orange-700 text-white px-6 py-3 rounded-md hover:bg-orange-800 transition-colors font-medium">
                                Rent the van
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VanDetail