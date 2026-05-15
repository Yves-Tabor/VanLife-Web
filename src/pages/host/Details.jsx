import { useOutletContext } from "react-router-dom"
import { useTheme } from "../../components/Theme"
import { hostTheme } from "../../util/hostTheme"

export default function Details() {
    const { currentVan } = useOutletContext()
    const { theme } = useTheme()
    const t = hostTheme(theme)

    return (
        <section className={t.body}>
            <h1 className={`text-xl p-1 font-bold ${t.heading}`}>Infos</h1>
            <h4 className="p-1">
                <span className="font-bold">Category:</span> {currentVan.type}
            </h4>
            <h4 className="p-1">
                <span className="font-bold">Name:</span> {currentVan.name}
            </h4>
            <h4 className="p-1">
                <span className="font-bold">Description:</span> {currentVan.description}
            </h4>
            <h4 className="p-1">
                <span className="font-bold">Visibility:</span> Public
            </h4>
        </section>
    )
}
