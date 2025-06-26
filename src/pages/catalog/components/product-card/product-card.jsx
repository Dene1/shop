import { Link } from "react-router-dom"
import { FiHeart } from "react-icons/fi"
import { FaStar } from "react-icons/fa"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { selectUserId, selectUserSession } from "@selectors"
import { useState } from "react"
import { Button, Modal } from "@components"
import { addCartAsync } from "@actions"
import { useServerRequest } from "@hooks"
import { SizeModal } from "./components/index.js"
import { nanoid } from "nanoid"

const ProductCardContainer = ({
    className,
    id,
    title,
    price,
    category,
    brand,
    size,
    imageUrl,
    reviewsCount,
}) => {
    const userId = useSelector(selectUserId)
    const sessionUserId = useSelector(selectUserSession)
    const [selectedSize, setSelectedSize] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [modalText, setModalText] = useState("")
    const [showSizeModal, setShowSizeModal] = useState(false)
    const requestServer = useServerRequest()
    const dispatch = useDispatch()

    const handleAddToCart = (productId) => {
        if (selectedSize === null) {
            setModalText("Please select a size.")
            setShowSizeModal(true)
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        const generateId = () => {
            return nanoid()
        }
        const myId = generateId()

        const cartItemId = `${productId}-${myId}`

        if (sessionUserId === null) {
            setModalText("Сначала авторизуйтесь")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        dispatch(
            addCartAsync(
                requestServer,
                cartItemId,
                userId,
                productId,
                selectedSize,
                1,
            ),
        )
        setShowSizeModal(false)
        setModalText("Товар добавлен в корзину")
        setIsOpen(true)
        setTimeout(() => {
            setIsOpen(false)
        }, 3000)
    }

    const handleCloseSizeModal = () => {
        setShowSizeModal(false)
    }

    return (
        <div className={className}>
            <FiHeart className="favorite" size="26px" />
            {isOpen && <Modal text={modalText} />}
            {showSizeModal && (
                <SizeModal
                    setSelectedSize={setSelectedSize}
                    handleAddToCart={handleAddToCart}
                    onClose={handleCloseSizeModal}
                    productId={id}
                    size={size}
                />
            )}
            <Link to={`/product/${id}`}>
                <img src={imageUrl ? imageUrl : undefined} alt={title} />
                <div className="product-card-footer">
                    <div className="product-card--title">{title}</div>
                    <div className="product-card--price">$ {price}</div>
                    <div>{category}</div>
                    <div className="reviews-count">
                        <div>{brand}</div>
                        <div className="rating">
                            <FaStar style={{ fill: "#dca109" }} size="18px" />{" "}
                            0.0 ({reviewsCount})
                        </div>
                    </div>
                </div>
            </Link>

            <div className="product-card-buttons">
                <Button
                    width="50%"
                    onClick={(e) => {
                        handleAddToCart(id)
                        e.stopPropagation()
                    }}
                >
                    add to cart
                </Button>
            </div>
        </div>
    )
}

export const ProductCard = styled(ProductCardContainer)`
    display: flex;
    flex-direction: column;
    width: 300px;
    border: 1px solid #2c3333;
    position: relative;

    .favorite {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;

        &:hover {
            fill: #ea454c;
            cursor: pointer;
            stroke: #5c656e;
        }
    }

    .size-container {
        cursor: pointer;
        padding: 5px;
        border: 1px solid #ccc;
        margin-right: 5px;
    }

    .size-container.selected {
        background-color: #ea454c;
        color: white;
    }

    .selected-size {
        margin-top: 10px;
        font-weight: bold;
    }

    .product-card--price {
        color: #5c656e;
        margin-top: auto;
        font:
            600 28px "Bebas Neue",
            sans-serif;
    }

    .product-card--title {
        text-align: center;
        display: flex;
        justify-content: center;
        margin-bottom: 4px;
        height: 80px;
        font:
            600 36px "Bebas Neue",
            sans-serif;
        max-height: 80px;
        overflow: hidden;
    }

    img {
        display: block;
        width: 100%;
        height: 260px;
    }

    .product-card-footer {
        padding: 5px;
        border-top: 1px solid #2c3333;
    }

    .product-card-buttons {
        display: flex;
        justify-content: center;
        margin: 5px;
        gap: 20px;
        align-items: center;
    }

    .rating {
        display: flex;
        align-items: center;
    }

    .reviews-count {
        display: flex;
        justify-content: space-between;
        margin-left: auto;
        gap: 5px;
        align-items: center;
    }
`
