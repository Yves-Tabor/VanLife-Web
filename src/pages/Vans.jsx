import React from 'react'

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
        <div className="p-8">
           <ul className="grid grid-cols-2  w-full space-y-[15%] md:space-y-[2%]  space-x-[10%]">
            {vans.map(van=>{
                return <li key={van.id} className='md:w-[90%] bg-[#f7f7f7] rounded-md p-[10px] md:px-[6%] md:py-[1%]'>
                             <img src={van.imageUrl} alt='Loading...' className='w-48 h-48 rounded-md md:w-[100%] md:h-auto'/>
                        <h2 className='text-xl font-bold p-[3%]'>{van.name}</h2>
                        <p className='text-lg ml-[1%] p-[2%]'>${van.price}/day</p>
                        <p className="flex items-center ml-[3%] justify-center text-[16px] py-2.5 px-6 font-semibold w-fit rounded-md text-white text-sm font-medium" 
                           style={{ backgroundColor: colors[Number(van.id) - 1] }}>
                            {van.type}
                        </p>
                       </li>
            })}
           </ul>
        </div>
    )
}