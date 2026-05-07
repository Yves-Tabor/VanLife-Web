import aboutPageImg from "../assets/images/about-hero.png"
import { Link } from "react-router-dom"

export default function About() {
    return (
        <div className="min-h-screen bg-[#FFF7ED]">
            <div className="relative w-full h-[60vh] md:h-[70vh]">
                <img 
                    src={aboutPageImg} 
                    alt="About VanLife" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white px-4 max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Don't squeeze in a sedan when you could relax in a van.
                        </h1>
                    </div>
                </div>
            </div>
            
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-orange-800">Our Mission</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                (Hitch costs extra 😉)
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-orange-800">Our Team</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Your destination is waiting.</h2>
                            <h3 className="text-2xl font-bold mb-6">Your van is ready.</h3>
                            <Link 
                                to="/vans" 
                                className="inline-block bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                Explore our vans
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}