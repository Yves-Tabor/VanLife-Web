import { useLoaderData } from "react-router-dom"
import { getHostVans, getHostIncomeSummary } from "../../api"
import requireAuth from "../../util"
import { useTheme } from "../../components/Theme"
import { hostTheme } from "../../util/hostTheme"

const incomeGraphUrl =
    "https://assets.scrimba.com/advanced-react/react-router/income-graph.png"

export async function loader({ request }) {
    await requireAuth(request)
    const hostVans = await getHostVans()
    return getHostIncomeSummary(hostVans)
}

export default function Income() {
    const { total, transactions, count } = useLoaderData()
    const { theme } = useTheme()
    const t = hostTheme(theme)

    return (
        <section className="px-[6%] md:px-[10%] py-8 md:py-10">
            <h1 className={`text-2xl md:text-[32px] font-bold mb-1 ${t.heading}`}>
                Income
            </h1>
            <p className={`${t.muted} text-base mb-2`}>
                Last <span className="font-semibold underline">30 days</span>
            </p>
            <h2 className={`font-extrabold text-4xl md:text-[48px] leading-tight mb-6 ${t.heading}`}>
                ${total.toLocaleString()}
            </h2>

            <img
                className="w-full max-w-[650px] mb-8 rounded-md"
                src={incomeGraphUrl}
                alt="Income trend over the last 30 days"
            />

            <div className={`flex flex-wrap items-baseline justify-between gap-2 mb-4 border-b pb-3 ${t.border}`}>
                <h3 className={`text-lg md:text-xl font-bold ${t.heading}`}>
                    Your transactions ({count})
                </h3>
                <p className={`${t.muted} text-sm md:text-base`}>
                    Last <span className="font-semibold underline">30 days</span>
                </p>
            </div>

            {count === 0 ? (
                <p className={`${t.muted} text-sm md:text-base max-w-lg`}>
                    No income yet. Rent a van from the catalog and it will show up here
                    as a transaction (12 days booked × daily rate per van).
                </p>
            ) : (
                <div className="flex flex-col gap-4 max-w-[650px]">
                    {transactions.map((item) => (
                        <article
                            key={item.id}
                            className={`flex items-center justify-between rounded-md px-4 py-3 ${t.card}`}
                        >
                            <div>
                                <h4 className={`font-bold text-lg md:text-xl ${t.heading}`}>
                                    ${item.amount.toLocaleString()}
                                </h4>
                                <p className={`${t.muted} text-xs md:text-sm mt-0.5`}>
                                    {item.vanName}
                                </p>
                            </div>
                            <p className={`${t.muted} text-sm md:text-base shrink-0`}>
                                {item.date}
                            </p>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}
