import { Button } from "@components"
import { useState } from "react"
import styled from "styled-components"

const SizeModalContainer = ({
    className,
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
        <div className={className}>
            <div className="overlay"></div>
            <div className="box">
                <h3>Выберите размер:</h3>
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
                        Добавить в корзину
                    </Button>
                    <Button height="60px" onClick={onClose}>
                        Отмена
                    </Button>
                </div>
            </div>
        </div>
    )
}

export const SizeModal = styled(SizeModalContainer)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;

    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        background-color: white;
        margin: 0 auto;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .size-container {
        padding: 5px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .size-container.selected {
        background-color: #ea454c;
        color: white;
    }

    .selected-size {
        margin-top: 10px;
        font-weight: bold;
    }

    .buttons-container {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        gap: 20px;
    }
`
