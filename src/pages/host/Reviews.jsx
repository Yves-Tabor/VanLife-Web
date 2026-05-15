import { useLoaderData } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { getHostVans, getHostReviewsSummary } from "../../api"
import requireAuth from "../../util"
import { useTheme } from "../../components/Theme"
import { hostTheme } from "../../util/hostTheme"

const reviewsGraphUrl =
    "https://assets.scrimba.com/advanced-react/react-router/reviews-graph.png"

export async function loader({ request }) {
    await requireAuth(request)
    const hostVans = await getHostVans()
    return getHostReviewsSummary(hostVans)
}

export default function Reviews() {
    const { reviews, count, averageRating } = useLoaderData()
    const { theme } = useTheme()
    const t = hostTheme(theme)

    return (
        <section className="px-[6%] md:px-[10%] py-8 md:py-10">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
                <h2 className={`text-2xl md:text-[32px] font-bold ${t.heading}`}>
                    Your reviews
                </h2>
                <p className={`${t.muted} text-base`}>
                    Last <span className="font-semibold underline">30 days</span>
                </p>
            </div>

            <img
                className="w-full max-w-[650px] mb-6 rounded-md"
                src={reviewsGraphUrl}
                alt="Review rating trend over the last 30 days"
            />

            {count > 0 && (
                <p className={`font-semibold text-lg mb-4 ${t.heading}`}>
                    Average rating:{" "}
                    <span className="text-orange-600">
                        {averageRating.toFixed(1)}
                    </span>
                    /5
                </p>
            )}

            <h3 className={`text-lg md:text-xl font-bold mb-4 ${t.heading}`}>
                Reviews ({count})
            </h3>

            {count === 0 ? (
                <p className={`${t.muted} text-sm md:text-base max-w-lg`}>
                    No reviews yet. When you rent vans from the catalog, guest
                    reviews for those trips will appear here.
                </p>
            ) : (
                <div className="max-w-[650px] flex flex-col gap-6">
                    {reviews.map((review, index) => (
                        <div key={review.id}>
                            <article className={`rounded-md px-4 py-4 ${t.card}`}>
                                <div className="flex flex-wrap items-start gap-3 mb-3">
                                    <div className="flex gap-0.5">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <BsStarFill
                                                key={i}
                                                className="text-orange-500 text-lg"
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                        <p className={`font-bold ${t.heading}`}>
                                            {review.name}
                                        </p>
                                        <p className={`${t.muted} text-sm`}>
                                            {review.date}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-orange-600 font-medium mb-2">
                                    {review.vanName}
                                </p>
                                <p className={`${t.muted} text-sm md:text-base leading-relaxed`}>
                                    {review.text}
                                </p>
                            </article>
                            {index < reviews.length - 1 && (
                                <hr className={`mt-6 ${t.border} border-t`} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
