import { Button } from "@/components"
import { useSelector } from "react-redux"
import {
    selectModalIsOpen,
    selectModalOnCancel,
    selectModalOnConfirm,
    selectModalText,
} from "@/selectors"
import { ConfirmModalContainer } from "@/components/confirm-modal/confirm-modal.styles"

export const ConfirmModal = () => {
    const isOpen = useSelector(selectModalIsOpen)
    const text = useSelector(selectModalText)
    const onConfirm = useSelector(selectModalOnConfirm)
    const onCancel = useSelector(selectModalOnCancel)

    if (!isOpen) {
        return null
    }

    return (
        <ConfirmModalContainer>
            <div className="overlay"></div>
            <div className="box">
                <h3>{text}</h3>
                <div className="buttons">
                    <Button width="120px" onClick={onConfirm}>
                        Yes
                    </Button>
                    <Button width="120px" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </ConfirmModalContainer>
    )
}
