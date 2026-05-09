import React from "react"
import { loginUser } from "../api"
import { Form, redirect, useLoaderData, useActionData, useNavigation } from 'react-router-dom'

export async function loader({request}) {
    const url = new URL(request.url)
    return url.searchParams.get("message")
}

export async function action({request}){
    const formData = await request.formData();
    const email = formData.get('email')
    const password = formData.get('password')
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/Host"
    
    try {
        const info = await loginUser({ email, password })
        console.log("Login successful:", info);
        localStorage.setItem("loggedin", "true")
        return redirect("/Host");
    } catch (error) {
        return error.message;
    }
}

export default function Login() {
    const [error, setError] = React.useState(null)
    const [status, setStatus] = React.useState('idle')
    const errorMsg = useActionData();
    const message = useLoaderData();
    const navigation = useNavigation();

    function handleSubmit(e){
        e.preventDefault();
        setError(null)
        setStatus("submitting")
        
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        
        loginUser({ email, password })
            .then(data=>{
                navigate("/Host", { replace: true })
            })
            .catch(err => setError(err))
            .finally(() => setStatus("idle"))
        }
    
    return (
        <div className="max-h-screen py-[10vh] bg-[#FFF7ED] flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    {message && <p className="text-red-500">{message}</p>}
                    {errorMsg && <h3 className="text-red-500">{errorMsg}</h3>}
                </div>
                <Form action='/Login' method="post" replace='/Host' className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
                    <div className="space-y-4">
                        <div>
                            <input
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <input
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting" 
                        ? "Logging in..." 
                        : "Log in"
                    }
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
}