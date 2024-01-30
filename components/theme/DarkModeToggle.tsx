import React, { useState, useEffect } from "react"

const DarkModeToggle = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const className = theme ? "dark" : "";
        document.documentElement.setAttribute("class", className);
    }, [theme])

    const toggleDarkmode = () => {
        if (theme === "dark") {
            setTheme("light");
        }
        else {
            setTheme("dark");
        }
    }

    return (
        <button className="bg-white text-black px-4 py-2 rounded dark:bg-black dark:text-white"
            onClick={toggleDarkmode}>
                {theme === "dark" ? "切换至明亮模式": "切换至黑暗模式"}
            </button>
    )
}

export default DarkModeToggle