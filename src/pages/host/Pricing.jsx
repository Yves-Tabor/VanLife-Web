import {useOutletContext} from 'react-router-dom'
export default function Pricing() {
    const {currentVan} = useOutletContext()
    return (
        <div>
            <h3>Price: <span className='p-1 text-xl font-bold'>${currentVan.price}</span>/day</h3>
        </div>
    )
}