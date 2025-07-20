import { useSelector } from "react-redux"
import { selectUserLogin } from "@/selectors"
import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Modal } from "@/components"

export const PrivateRoute = ({ element: component }) => {
    const isAuthenticated = useSelector(selectUserLogin)
    const [shouldRedirect, setShouldRedirect] = useState(false)

    useEffect(() => {
        if (!isAuthenticated) {
            const timer = setTimeout(() => {
                setShouldRedirect(true)
            }, 3000)

            return () => clearTimeout(timer) // Очистка таймера при размонтировании
        }
    }, [isAuthenticated])

    if (shouldRedirect) {
        return <Navigate to="/login" replace />
    }

    if (!isAuthenticated) {
        return <Modal text="You are not logged in, move to the login page" />
    }

    return component
}
