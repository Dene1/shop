import { Button, Modal } from "@/components"
import { useNavigate, useParams } from "react-router-dom"
import { FaPencilAlt, FaStarHalfAlt } from "react-icons/fa"
import { SpecialPanel } from "@/pages/product/components/special-panel/special-panel"
import { FiHeart } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { selectProduct, selectUserId } from "@/selectors"
import { useState } from "react"
import { addCartAsync } from "@/actions"
import { ProductContentContainer } from "@/pages/product/components/product-content/product-content.styles"
import { useModal } from "@/pages/admin-panel/utils/hooks"

export const ProductContent = () => {
    const navigate = useNavigate()
    const params = useParams()
    const path = `${params.id}`
    const userId = useSelector(selectUserId)
    const [selectedSize, setSelectedSize] = useState(null)
    const dispatch = useDispatch()
    const product = useSelector(selectProduct)
    const { isOpen, modalText, showModal } = useModal()

    const getSizeArray = (sizeData) => {
        if (Array.isArray(sizeData)) {
            return [...sizeData].sort((a, b) => parseInt(a) - parseInt(b))
        } else if (typeof sizeData === "string") {
            return sizeData.sort((a, b) => parseInt(a) - parseInt(b)).split(",")
        } else {
            return []
        }
    }

    const sizeArray = getSizeArray(product.size)

    const handleAddToCart = (productId) => {
        if (selectedSize === null) {
            showModal("Select size")
            return
        }

        if (userId === null) {
            showModal("Please Log In")
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
        showModal("The goods are added to the cart", 3000)
    }

    const handleSizeClick = (size) => setSelectedSize(size)

    return (
        <ProductContentContainer>
            {isOpen && <Modal text={modalText} />}
            <div className="header-container">
                <button className="back" onClick={() => navigate(-1)}>
                    Back
                </button>
                <span className="path-text">ID product: {path}</span>

                <SpecialPanel
                    id={product.id}
                    margin=" 0 20px"
                    editButton={
                        <FaPencilAlt
                            size="21px"
                            margin="0 10px 0 0"
                            onClick={() =>
                                navigate(`/product/${product.id}/edit`)
                            }
                        />
                    }
                />
            </div>
            <div className="product">
                <img
                    src={product.imageUrl ? product.imageUrl : undefined}
                    alt={product.title}
                />
                <div className="product-info">
                    <div className="reviews">
                        <FaStarHalfAlt size={18} />
                        {product.reviews.length}
                        <span>Reviews</span>
                    </div>
                    <h1>{product.title}</h1>
                    {product.category}
                    <div className="price-container">
                        <div className="content-title">PRICE</div>
                        <div className="price">{product.price}$</div>
                    </div>
                    <div className="sizes">
                        <div className="content-title">SIZE</div>
                        <div className="size-items">
                            {sizeArray.map((item, index) => (
                                <div
                                    className={`size-container ${selectedSize === item ? "selected" : ""}`}
                                    key={index}
                                    onClick={() => handleSizeClick(item)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="buttons">
                        <FiHeart className="heart" size="26px" />
                        <Button
                            width="40%"
                            id={product.id}
                            onClick={() => handleAddToCart(product.id)}
                        >
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>

            <div className="product-description">
                <h1>DESCRIPTION</h1>
                <div className="description">{product.description}</div>
            </div>
        </ProductContentContainer>
    )
}
