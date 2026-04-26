import {useOutletContext} from "react-router-dom"
export default function Photos() {
    const {currentVan} = useOutletContext()
    return (
        <div>
            <img className="min-w-26 w-[20%] md:min-w-26 w-[20%] lg:w-[11%] h-auto object-cover" src={currentVan.imageUrl} alt={currentVan.name} />
        </div>
    )
}