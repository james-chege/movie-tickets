import {useEffect} from "react";

export function useTimeout(func, value, timeout= 3000) {
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            func();
        }, timeout)

        return () => clearTimeout(delayDebounceFn)
    }, [value])
}
