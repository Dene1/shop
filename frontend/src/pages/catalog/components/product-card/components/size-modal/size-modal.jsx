import { Button } from "@/components"
import { useState } from "react"
import { SizeModalContainer } from "@/pages/catalog/components/product-card/components/size-modal/size-modal.styles"

export const SizeModal = ({
    handleAddToCart,
    onClose,
    productId,
    setSelectedSize,
    size,
}) => {
    const [localSelectedSize, setLocalSelectedSize] = useState(null)
    const handleSizeSelect = (size) => {
        setLocalSelectedSize(size)
        setSelectedSize(size)
    }

    return (
        <SizeModalContainer>
            <div className="overlay"></div>
            <div className="box">
                <h3>Select the size:</h3>
                <div className="size-container">
                    {size.map((item) => (
                        <Button
                            key={item}
                            width="50px"
                            fontSize="18px"
                            className={`size-container ${localSelectedSize === item ? "selected" : ""}`}
                            onClick={() => handleSizeSelect(item)}
                        >
                            {item}
                        </Button>
                    ))}
                </div>
                <div className="buttons-container">
                    <Button
                        height="60px"
                        onClick={() => {
                            handleAddToCart(productId)
                            onClose()
                        }}
                    >
                        Add to basket
                    </Button>
                    <Button height="60" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </SizeModalContainer>
    )
}
