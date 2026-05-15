import { useOutletContext } from "react-router-dom"
import { useTheme } from "../../components/Theme"
import { hostTheme } from "../../util/hostTheme"

export default function Pricing() {
    const { currentVan } = useOutletContext()
    const { theme } = useTheme()
    const t = hostTheme(theme)

    return (
        <div className={t.body}>
            <h3 className={t.heading}>
                Price:{" "}
                <span className="p-1 text-xl font-bold text-orange-500">
                    ${currentVan.price}
                </span>
                /day
            </h3>
        </div>
    )
}
