export function hostTheme(theme) {
    const light = theme === "light"

    return {
        page: light
            ? "bg-[#FEF6EA] text-[#161616] min-h-screen"
            : "bg-black text-white min-h-screen",
        heading: light ? "text-[#161616]" : "text-white",
        muted: light ? "text-[#4D4D4D]" : "text-gray-400",
        card: light
            ? "bg-white border border-[#E8E8E8] shadow-sm"
            : "bg-gray-900 border border-gray-700 shadow-sm",
        panel: light ? "bg-white shadow-md" : "bg-gray-800 shadow-md",
        border: light ? "border-[#C7C7C7]" : "border-gray-700",
        borderStrong: light ? "border-[#151515]" : "border-gray-500",
        body: light ? "text-[#161616]" : "text-gray-100",
        link: "text-orange-500 hover:text-orange-600",
        navInactive: light
            ? "text-[#161616] hover:text-orange-600"
            : "text-gray-200 hover:text-orange-400",
        navActive:
            "font-semibold p-1 underline text-orange-600 transition-all duration-300",
        navBase:
            "py-1 px-2 transition-all duration-300 ease-in-out",
        vanRow: light ? "bg-white" : "bg-gray-900",
        clearBtn: light
            ? "border-black border-2 px-2 hover:bg-gray-200 text-black"
            : "border-gray-500 border-2 px-2 hover:bg-gray-800 text-white",
    }
}

export function hostNavClass(theme, isActive) {
    const t = hostTheme(theme)
    return isActive
        ? `${t.navActive} ${t.navBase}`
        : `hover:underline font-normal ${t.navBase} ${t.navInactive}`
}
