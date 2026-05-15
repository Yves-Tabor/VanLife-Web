import { loginUser, signupUser } from "../api"
import {
    Form,
    redirect,
    useLoaderData,
    useActionData,
    useNavigation,
    Link,
} from "react-router-dom"
import { useTheme } from "../components/Theme"

export async function loader({ request }) {
    const url = new URL(request.url)
    return {
        message: url.searchParams.get("message"),
        mode: url.searchParams.get("mode") === "signup" ? "signup" : "login",
        redirectTo: url.searchParams.get("redirectTo") || "/Host",
    }
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")?.toString().trim() ?? ""
    const password = formData.get("password")?.toString() ?? ""
    const confirmPassword = formData.get("confirmPassword")?.toString() ?? ""
    const intent = formData.get("intent")
    const pathname =
        new URL(request.url).searchParams.get("redirectTo") || "/Host"

    if (!email || !password) {
        return "Email and password are required."
    }

    if (intent === "signup" && password !== confirmPassword) {
        return "Passwords do not match."
    }

    if (intent === "signup" && password.length < 6) {
        return "Password must be at least 6 characters."
    }

    try {
        if (intent === "signup") {
            await signupUser({ email, password })
        } else {
            await loginUser({ email, password })
        }
        return redirect(pathname)
    } catch (error) {
        return error.message
    }
}

function inputClass(theme) {
    return `appearance-none rounded-md block w-full px-3 py-2 border text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
        theme === "light"
            ? "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
            : "border-gray-700 bg-gray-800 text-white placeholder-gray-400"
    }`
}

export default function Login() {
    const { theme } = useTheme()
    const { message, mode, redirectTo } = useLoaderData()
    const redirectQuery = redirectTo
        ? `?redirectTo=${encodeURIComponent(redirectTo)}`
        : ""
    const errorMsg = useActionData()
    const navigation = useNavigation()
    const isSignup = mode === "signup"
    const isSubmitting = navigation.state === "submitting"

    const heading = isSignup ? "Create your account" : "Sign in to your account"
    const submitLabel = isSubmitting
        ? isSignup
            ? "Creating account..."
            : "Logging in..."
        : isSignup
          ? "Sign up"
          : "Log in"

    return (
        <div
            className={`${theme === "light" ? "bg-[#FFF7ED]" : "bg-black"} min-h-screen py-[10vh] flex items-center justify-center px-4 ${theme === "dark" ? "dark" : ""}`}
        >
            <div className="max-w-md w-full space-y-8">
                <div className="text-center space-y-2">
                    <h2
                        className={`text-3xl font-extrabold ${theme === "light" ? "text-gray-900" : "text-white"}`}
                    >
                        {heading}
                    </h2>
                    <p
                        className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                    >
                        {isSignup
                            ? "Join VanLife to list and manage your vans."
                            : "Welcome back! Enter your credentials to continue."}
                    </p>
                    {message && (
                        <p className="text-sm text-amber-600 dark:text-amber-400">
                            {message}
                        </p>
                    )}
                    {errorMsg && (
                        <p className="text-sm text-red-500" role="alert">
                            {errorMsg}
                        </p>
                    )}
                </div>

                <Form
                    method="post"
                    className={`mt-8 space-y-6 p-8 rounded-lg shadow-lg border ${
                        theme === "light"
                            ? "bg-white border-gray-100"
                            : "bg-gray-900 border-gray-800"
                    }`}
                >
                    <input
                        type="hidden"
                        name="intent"
                        value={isSignup ? "signup" : "login"}
                    />

                    <div className="space-y-4">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className={inputClass(theme)}
                            placeholder="Email address"
                        />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete={isSignup ? "new-password" : "current-password"}
                            required
                            minLength={6}
                            className={inputClass(theme)}
                            placeholder="Password"
                        />
                        {isSignup && (
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                minLength={6}
                                className={inputClass(theme)}
                                placeholder="Confirm password"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2.5 px-4 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    >
                        {submitLabel}
                    </button>

                    <p
                        className={`text-center text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                    >
                        {isSignup ? (
                            <>
                                Already have an account?{" "}
                                <Link
                                    to={`/Login${redirectQuery}`}
                                    className="font-medium text-orange-500 hover:text-orange-600"
                                >
                                    Log in
                                </Link>
                            </>
                        ) : (
                            <>
                                New to VanLife?{" "}
                                <Link
                                    to={`/Login?mode=signup&redirectTo=${encodeURIComponent(redirectTo)}`}
                                    className="font-medium text-orange-500 hover:text-orange-600"
                                >
                                    Create an account
                                </Link>
                            </>
                        )}
                    </p>
                </Form>
            </div>
        </div>
    )
}
