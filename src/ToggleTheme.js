import { useState, useEffect } from "react";

function ToggleTheme() {
    const [theme, setTheme] = useState(null);

    const toggle = () => {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

        if (prefersDarkScheme.matches) {
            document.body.classList.toggle("light-theme");
            document.getElementById("theme-switch").innerHTML = "light_mode";
        } else {
            document.body.classList.remove("light-theme");
            document.getElementById("theme-switch").innerHTML = "dark_mode";
        }
    }

    const startingTheme = () => {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

        if (prefersDarkScheme.matches) {
            return "dark_mode";
        } else {
            return "light_mode";
        }
    }

    useEffect(() => {
        const current = startingTheme();
        setTheme(current);
    }, []);

    return (
        <button className="toggle-theme" onClick={toggle}>
            <i id="theme-switch" className="material-icons">{ theme }</i>
        </button>
    );
}

export default ToggleTheme;