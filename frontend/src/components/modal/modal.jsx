import { ProductModalContainer } from "@/components/modal/modal.styles"

export const Modal = ({ text }) => {
    return (
        <ProductModalContainer>
            <div className="notification-text">{text}</div>
        </ProductModalContainer>
    )
}
