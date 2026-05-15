import { redirect } from "react-router-dom"
import { auth } from "./firebase"

export default async function requireAuth(request) {
    await auth.authStateReady()

    if (!auth.currentUser) {
        const pathname = request
            ? new URL(request.url).pathname
            : "/Host"
        throw redirect(
            `/Login?message=${encodeURIComponent("You must be logged in before you can access this page.")}&redirectTo=${encodeURIComponent(pathname)}`
        )
    }

    return null
}
