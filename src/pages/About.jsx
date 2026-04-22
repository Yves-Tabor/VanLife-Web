import bgImg from "../assets/images/about-hero.png"
import { Link } from "react-router-dom"

export default function About() {
    return (
        <>
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#FEF6EA]">
            <div className="about-page-container w-full h-[85vh] md:w-[90%]">
                <div className="about-page-content p-2 flex flex-col md:gap-3 pt-[2%]">
                    <h1 className='font-bold text-4xl'>Don’t squeeze in a sedan when you could relax in a van.</h1>
                    <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra)</p>
                    <p>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                </div>
                <div className="about-page-cta p-2 flex flex-col gap-4">
                    <h2>Your destination is waiting.<br />Your van is ready.</h2>
                    <Link className="link-button bg-black w-fit py-2 px-4 text-white rounded-sm" to="/vans">Explore our vans</Link>
                </div>
            </div>
        </div>
        </>
    );
}