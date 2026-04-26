import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function Vans() {
    const [vans, setVans] = React.useState([])
    const colors = ['#6b0909ff', '#4ECDC4', '#545f61ff', '#1eba71ff', '#a18a3eff', '#151515ff']
    const [searchParams, setSearchParams] = useSearchParams('');
    const typeFilter = searchParams.get('type')
    const [isFiltered, setIsFiltered] = React.useState(false)

    React.useEffect(() => {
        fetch('/api/vans')
            .then(res => res.json())
            .then(data => {
                setVans(data.vans)
            })
            .catch(err => {
                console.error("Error Fetching Vans:", err)
            })
    }, [])
    
    const hoverColors = [
        'hover:bg-[#6b0909ff]',
        'hover:bg-[#4ECDC4]',
        'hover:bg-[#545f61ff]    ',
        'hover:bg-[#1eba71ff]',
        'hover:bg-[#a18a3eff]',
        'hover:bg-[#151515ff]',
        ];

    const randomHover1 = hoverColors[Math.floor(Math.random() * hoverColors.length)];
    const randomHover2 = hoverColors[Math.floor(Math.random() * hoverColors.length)];
    const randomHover3 = hoverColors[Math.floor(Math.random() * hoverColors.length)];
    
    return (
        <div className="p-2 bg-[#FEF6EA]">
            <h1 className="text-2xl font-bold p-5">Explore our van options</h1>
            <div className='w-full flex flex-col md:flex-row items-center justify-evenly p-[5%] md:p-[2%] gap-3 md:gap-0'>
                <div className='w-full md:w-2/3 flex justify-between md:justify-evenly text-white'>
                    <button onClick={()=> {
                        setIsFiltered(prev=> prev = true)
                        setSearchParams('?type=simple')}
                        }
                         className={`bg-orange-400 px-2 py-1 rounded-sm ${isFiltered ? randomHover1 : ''}`}>
                        Simple
                    </button>
                    <button onClick={()=> {
                        setIsFiltered(prev=> prev = true)
                        setSearchParams('?type=luxury')}
                        }
                         className={`bg-orange-400 px-2 py-1 rounded-sm ${isFiltered ? randomHover2 : ''}`}>
                        Luxury
                    </button>
                    <button onClick={()=> {
                        setIsFiltered(prev=> prev = true)
                        setSearchParams('?type=rugged')}
                        }
                         className={`bg-orange-400 px-2 py-1 rounded-sm ${isFiltered ? randomHover3 : ''}`}>
                        Rugged
                    </button>
                </div><div>
                    {isFiltered && <button onClick={()=> {
                        setIsFiltered(prev=> prev = false)
                        setSearchParams('')
                        }} className='border-black border-2 px-2 hover:bg-gray-200'>Clear filters</button>}
                </div>

                {/* <div className='w-full md:w-2/3 flex justify-between md:justify-evenly text-white'>
                    <Link to={getNewSearch('type', 'simple')} className='bg-orange-400 hover:bg-orange-500 px-2 py-1 rounded-sm'>
                        Simple
                    </Link>
                    <Link to={getNewSearch('type', 'luxury')} className='bg-orange-400 hover:bg-orange-500 px-2 py-1 rounded-sm'>
                        Luxury
                    </Link>
                    <Link to={getNewSearch('type', 'rugged')} className='bg-orange-400 hover:bg-orange-500 px-2 py-1 rounded-sm'>
                        Rugged
                    </Link>
                </div><div>
                    {isFiltered && <Link to={getNewSearch('type', null)} className='border-black border-2 px-2'>Clear filters</Link>}
                </div> */}

            </div>
           <ul className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full space-y-[15%] md:space-y-[2%]  space-x-[10%]">
            {vans.filter(van => typeFilter? van.type === typeFilter : true).map(van=>{
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