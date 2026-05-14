import { useTheme } from "./Theme"

export default function Footer() {
    const {theme} = useTheme()
    return (
        <footer className={`${theme === 'light' ? 'bg-[#FEF6EA]' : 'bg-black'} bottom-0 w-full h-fit flex items-center justify-center`}>
            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} text-sm p-4`}><span className="text-xl">©</span> 2026 #VANLIFE</p>
        </footer>
    )
}