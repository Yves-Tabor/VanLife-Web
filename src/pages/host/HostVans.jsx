import React from "react"
import { Link, Outlet } from "react-router-dom"


export default function HostVans() {
    const [hostVans, setHostVans] = React.useState([])
        const colors = ['#6b0909ff', '#4ECDC4', '#545f61ff', '#1eba71ff', '#a18a3eff', '#151515ff']
        React.useEffect(() => {
            fetch('/api/vans')
                .then(res => res.json())
                .then(data => {
                    setHostVans(data.vans)
                })
                .catch(err => {
                    console.error("Error Fetching Vans:", err)
                })
        }, [])
        
    
        
        return (
            <div className="p-2 bg-[#FEF6EA]">
               <div className="flex flex-col w-full space-y-[7%] md:space-y-[4%] w-full items-start pl-[5%] md:pl-[10%]">
                <h2 className="text-xl md:text-3xl font-bold justify-start border-b-2 border-[#151515]">Your listed vans</h2>
                {hostVans.map(hostVan=>{
                    return <Link to={`${hostVan.id}`} key={hostVan.id} className='flex min-w-[290px] w-[88%] md:w-[88%] bg-white gap-[8%] md:gap-[3%] rounded-md p-[8px] md:px-[6%] md:py-[1%]'>
                                 <img src={hostVan.imageUrl} alt='Loading...' className='min-w-20 w-[20%] h-auto rounded-md md:w-[18%] lg:w-[15%] md:h-auto'/>
                            <div className='flex flex-col w-[60%]'>
                                <h2 className='text-md md:text-xl font-semibold md:font-bold p-[2%] w-full'>{hostVan.name}</h2>
                                <p className='text-sm ml-[1%] p-[2%] md:text-lg'><span className="text-2xl font-bold">${hostVan.price}</span>/day</p>
                            </div>
                           </Link>
                })}
               </div>
               <Outlet />
            </div>
        )
}