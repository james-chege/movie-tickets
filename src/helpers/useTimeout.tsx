import {useEffect} from "react";

export function useTimeout(func: () => void, value: any) {
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            func();
        }, 3000)

        return () => clearTimeout(delayDebounceFn)
    }, [value])
}