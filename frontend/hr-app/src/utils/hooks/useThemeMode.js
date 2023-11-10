import { useState } from "react";
import { THEME_STATE } from "../constants";

function initThemeSelected() {

    if (localStorage.theme === THEME_STATE.DARK || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add(THEME_STATE.DARK);
        localStorage.setItem('theme', THEME_STATE.DARK);
    } else {
        document.documentElement.classList.remove(THEME_STATE.DARK);
        localStorage.setItem('theme', THEME_STATE.LIGHT);
    }

    const theme = localStorage.theme;
    return theme;
}

// refer to https://tailwindcss.com/docs/dark-modeF
export default function useThemeMode() {

    const [themeMode, setThemeMode] = useState(initThemeSelected());

    function saveTheme(selectedThemeMode) {

        if (selectedThemeMode === THEME_STATE.SYSTEM) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                localStorage.setItem('theme', THEME_STATE.DARK);

            }
            else {
                localStorage.setItem('theme', THEME_STATE.LIGHT);
            }
            setThemeMode(THEME_STATE.SYSTEM);
            return;
        }

        localStorage.setItem('theme', selectedThemeMode);
        setThemeMode(selectedThemeMode);
    }

    return {
        setTheme: saveTheme,
        themeMode
    }

}
