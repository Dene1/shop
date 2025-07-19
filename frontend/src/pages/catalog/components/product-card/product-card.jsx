import { Link } from "react-router-dom"
import { FiHeart } from "react-icons/fi"
import { FaStar } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { selectUserId, selectUserRole } from "@/selectors"
import { useState } from "react"
import { Button, Modal } from "@/components"
import { addCartAsync } from "@/actions"
import { SizeModal } from "./components"
import { ROLE } from "@/constants"
import { ProductCardContainer } from "@/pages/catalog/components/product-card/product-card.styles"

export const ProductCard = ({
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
    const [selectedSize, setSelectedSize] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [modalText, setModalText] = useState("")
    const [showSizeModal, setShowSizeModal] = useState(false)
    const dispatch = useDispatch()
    const userRole = useSelector(selectUserRole)

    const handleAddToCart = (productId) => {
        if (selectedSize === null) {
            setModalText("Please select a size")
            setShowSizeModal(true)
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 1000)
            return
        }

        if (userRole === ROLE.GUEST) {
            setModalText("Please log in")
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
            return
        }

        dispatch(
            addCartAsync({
                user_id: userId,
                product_id: productId,
                size: selectedSize,
                count: 1,
            }),
        )

        setShowSizeModal(false)
        setModalText("The shoes are added to the cart")
        setIsOpen(true)
        setTimeout(() => {
            setIsOpen(false)
        }, 3000)
    }

    const handleCloseSizeModal = () => {
        setShowSizeModal(false)
    }

    return (
        <ProductCardContainer>
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
        </ProductCardContainer>
    )
}
