import React from 'react'
import { Link } from 'react-router-dom'

export default function Vans() {
    const [vans, setVans] = React.useState([])
    const colors = ['#6b0909ff', '#4ECDC4', '#545f61ff', '#1eba71ff', '#a18a3eff', '#151515ff']
    React.useEffect(() => {
        fetch('/api/vans')
            .then(res => res.json())
            .then(data => {
                console.log("Response:", data.vans)
                setVans(data.vans)
            })
            .catch(err => {
                console.error("Error Fetching Vans:", err)
            })
    }, [])
    

    
    return (
        <div className="p-2 bg-[#FEF6EA]">
           <ul className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full space-y-[15%] md:space-y-[2%]  space-x-[10%]">
            {vans.map(van=>{
                return <li key={van.id} className='md:w-[90%] bg-[#f0f0f0] rounded-md p-[10px] md:px-[6%] md:py-[1%]'>
                             <img src={van.imageUrl} alt='Loading...' className='xs:w-[1fr] h-auto rounded-md md:w-[100%] md:h-auto'/>
                        <h2 className='text-xl font-bold p-[3%]'>{van.name}</h2>
                        <p className='text-lg ml-[1%] p-[2%]'>${van.price}/day</p>
                       <Link to={`/Vans/${van.id}`}> <p className="flex items-center ml-[3%] justify-center text-[16px] py-2.5 px-6 font-semibold w-fit rounded-md text-white text-sm font-medium" 
                           style={{ backgroundColor: colors[Number(van.id) - 1] }}>
                            {van.type}
                        </p>
                       </Link>
                       </li>
            })}
           </ul>
        </div>
    )
}