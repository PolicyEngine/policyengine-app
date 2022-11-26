import { useEffect, useMemo, useState } from "react";


const useWindowHeight = () => {
    const [ windowHeight, setWindowHeight ] = useState(window.innerHeight);

    useEffect(() => {
        const handler = () => setWindowHeight(window.innerHeight);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    return useMemo(() => windowHeight, [windowHeight]);
}

export default useWindowHeight;