import { useState } from "react"

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [modalText, setModalText] = useState("")

    const showModal = (text, duration = 2000) => {
        setModalText(text)
        setIsOpen(true)
        setTimeout(() => {
            setIsOpen(false)
        }, duration)
    }

    const hideModal = () => {
        setIsOpen(false)
    }

    return {
        isOpen,
        modalText,
        showModal,
        hideModal,
    }
}
