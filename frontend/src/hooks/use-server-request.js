import { useSelector } from "react-redux"
import { selectUserSession } from "../selectors/index.js"
import { server } from "../bff/index.js"
import { useCallback } from "react"

export const useServerRequest = () => {
    const session = useSelector(selectUserSession)

    return useCallback((operation, ...params) => {
        const request = ["register", "authorize", "fetchProduct", "fetchProducts"].includes(operation)
            ? params
            : [session, ...params]

        return server[operation](...request)
    }, [session])
}
