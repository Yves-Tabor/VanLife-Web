import aboutPageImg from "../assets/images/about-hero.png"
import { Link } from "react-router-dom"
import { useTheme } from "../components/Theme"

export default function About() {
    const {theme} = useTheme()
    return (
        <div className={`min-h-screen ${theme === 'light' ? 'bg-[#FFF7ED] text-black' : 'bg-black text-white'}`}>
            <div className="relative w-full h-[60vh] md:h-[70vh]">
                <div
                    style={{ backgroundImage: `url(${aboutPageImg})` }}
                    className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
                >
                    <div className="absolute inset-2 text-center flex items-center justify-center px-4 max-w-4xl bg-black/70">
                        <h1 className={`text-4xl md:text-5xl ${theme === 'light' ? 'text-white' : 'text-[#FFF7ED]'} font-bold mb-4`}>
                            Don't squeeze in a sedan when you could relax in a van.
                        </h1>
                    </div>
                </div>
            </div>
            
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-8 rounded-lg shadow-lg`}>
                            <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-orange-800' : 'text-orange-400'}`}>Our Mission</h2>
                            <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} leading-relaxed`}>
                                Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
                            </p>
                            <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} leading-relaxed mt-4`}>
                                (Hitch costs extra)
                            </p>
                        </div>
                        
                        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-8 rounded-lg shadow-lg`}>
                            <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-orange-800' : 'text-orange-400'}`}>Our Team</h2>
                            <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} leading-relaxed`}>
                                Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} p-8 rounded-lg shadow-lg`}>
                            <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Your destination is waiting.</h2>
                            <h3 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Your van is ready.</h3>
                            <Link 
                                to="/vans" 
                                className={`inline-block ${theme === 'light' ? 'bg-black hover:bg-gray-800 text-white' : 'bg-white hover:bg-gray-200 text-black'} font-semibold py-3 px-8 rounded-lg transition-colors`}
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