import { useEffect, useState } from "react";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

// Refer from https://stackoverflow.com/a/36862446
export default function useMediaQuery() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [isMobile, setIsMobile] = useState();

    useEffect(() => {
        setIsMobile(windowDimensions.width < 768);
    }, [windowDimensions])

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return {
        isMobile: isMobile
    }

}
