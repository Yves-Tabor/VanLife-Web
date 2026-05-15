import {
    useLocation,
    useLoaderData,
    Form,
    useActionData,
    useNavigation,
    Link,
    redirect,
} from "react-router-dom"
import { getVan, rentVan } from "../api"
import requireAuth from "../util"
import { useTheme } from "../components/Theme"
import useAuth from "../hooks/useAuth"

export async function loader({ params }) {
    return getVan(params.id)
}

export async function action({ request, params }) {
    const formData = await request.formData()
    if (formData.get("intent") !== "rent") {
        return null
    }

    try {
        await requireAuth(request)
        const hostVanId = await rentVan(params.id)
        return redirect(`/Host/vans/${hostVanId}`)
    } catch (error) {
        if (error instanceof Response) {
            throw error
        }
        return error.message || "Could not rent this van."
    }
}

export default function VanDetail() {
    const van = useLoaderData()
    const location = useLocation()
    const { theme } = useTheme()
    const { isLoggedIn, loading } = useAuth()
    const errorMsg = useActionData()
    const navigation = useNavigation()
    const isRenting = navigation.state === "submitting"
    const search = location.state?.search || ""
    const type = location.state?.type || "all"
    const loginUrl = `/Login?redirectTo=${encodeURIComponent(location.pathname)}`

    const rentDisabled = loading || !isLoggedIn || isRenting

    return (
        <div
            className={`${theme === "light" ? "bg-[#FEF6EA]" : "bg-black"} w-full flex flex-col items-center min-h-screen`}
        >
            <div className="container mx-auto px-4 py-8 w-[85%] flex flex-col items-center justify-center">
                <Link
                    to={`/Vans?${search}`}
                    className="w-full mb-6 hover:text-gray-800 flex items-start"
                >
                    <span className="mr-2">«</span>
                    <span
                        className={`hover:underline ${theme === "light" ? "text-black" : "text-white"}`}
                    >
                        Back to {type.charAt(0).toUpperCase() + type.slice(1)} vans
                    </span>
                </Link>

                <img
                    src={van.imageUrl}
                    alt={`${van.name} van`}
                    className="w-full md:w-[60%] lg:w-[50%] h-auto rounded-md mb-6"
                />

                <div className="bg-white rounded-lg p-6 shadow-md w-full md:w-[60%] lg:w-[50%]">
                    <p className="text-black w-fit py-2 px-4 bg-orange-100 text-lg capitalize">
                        {van.type}
                    </p>
                    <h1 className="text-3xl font-bold mb-4 mt-2 text-black">{van.name}</h1>
                    <p className="text-md font-semibold text-black">${van.price}/day</p>

                    <div className="pt-4">
                        <h2 className="text-xl font-semibold mb-3 text-black">Description</h2>
                        <p className="text-gray-600 leading-relaxed text-black">
                            {van.description}
                        </p>
                    </div>

                    {errorMsg && (
                        <p className="mt-4 text-sm text-red-600" role="alert">
                            {errorMsg}
                        </p>
                    )}

                    <div className="mt-6 space-y-3">
                        {!loading && !isLoggedIn && (
                            <p className="text-sm text-gray-600">
                                You need an account to rent this van.{" "}
                                <Link
                                    to={`${loginUrl}&mode=signup`}
                                    className="text-orange-600 font-medium hover:underline"
                                >
                                    Sign up
                                </Link>{" "}
                                or{" "}
                                <Link
                                    to={loginUrl}
                                    className="text-orange-600 font-medium hover:underline"
                                >
                                    log in
                                </Link>
                                .
                            </p>
                        )}

                        <Form method="post">
                            <input type="hidden" name="intent" value="rent" />
                            <button
                                type="submit"
                                disabled={rentDisabled}
                                title={
                                    !isLoggedIn
                                        ? "Log in to rent this van"
                                        : undefined
                                }
                                className="bg-orange-700 text-white px-6 py-3 rounded-md hover:bg-orange-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-700"
                            >
                                {isRenting
                                    ? "Adding to your vans..."
                                    : isLoggedIn
                                      ? "Rent the van"
                                      : "Log in to rent"}
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
