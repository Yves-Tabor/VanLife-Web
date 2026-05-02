import React from "react"
import { Form, useLoaderData } from "react-router-dom"

export async function loader({request}) {
    const url = new URL(request.url)
    return url.searchParams.get("message")
}

export default function Login() {
    const [formData, setFormData] = React.useState({email: "", password: ""})
    const message = useLoaderData();
    function handleSubmit(e){
        e.preventDefault();
        console.log(formData);
        e.target.reset();
        setFormData({email: "", password: ""})
    }

    function handleChange(e){
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div className="max-h-screen py-[10vh] bg-[#FFF7ED] flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    {message && <p className="text-red-500">{message}</p>}
                </div>
                <Form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
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
                            onChange={handleChange}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Log In
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
}