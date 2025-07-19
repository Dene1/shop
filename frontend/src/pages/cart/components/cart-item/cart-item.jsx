import { FaRegCircle, FaRegTrashAlt } from "react-icons/fa"
import {
    CartItemContainer,
    Container,
} from "@/pages/cart/components/cart-item/cart-item.styles"

export const CartItem = ({
    product,
    productDetails,
    handleRemoveFromCart,
    increaseCount,
    decreaseCount,
}) => {
    const disabled = () => productDetails.count <= 1
    return (
        <CartItemContainer>
            <div className="remove-from-cart">
                <FaRegTrashAlt
                    size="22px"
                    onClick={() => handleRemoveFromCart(productDetails.id)}
                />
            </div>

            <Container to={`/product/${productDetails.product_id}`}>
                <img src={product.imageUrl} alt={product.title} />

                <div className="product-info">
                    <h3>{product.title}</h3>
                    <div className="container">
                        <span>{product.gender}</span>
                        <span className="dot">
                            {" "}
                            <FaRegCircle size="8px" />{" "}
                        </span>
                        <span>
                            Size:{" "}
                            <span className="size">{productDetails.size}</span>
                        </span>
                    </div>
                    <div className="product-price">$ {product.price}</div>
                </div>
            </Container>

            <div className="quantity">
                <div className="quantity-title">QTY</div>
                <div className="quantity-container">
                    <button
                        className="q-btn"
                        onClick={() => increaseCount(productDetails.id)}
                    >
                        +
                    </button>
                    <div className="q-value">{productDetails.count}X</div>
                    <button
                        className="q-btn"
                        disabled={disabled()}
                        onClick={() => decreaseCount(productDetails.id)}
                    >
                        -
                    </button>
                </div>
            </div>
            <div>
                <div className="subtotal-price">
                    <div className="subtotal-price-title">SUBTOTAL</div>
                    <div className="subtotal-price-value">
                        $ {product.price * productDetails.count}
                    </div>
                </div>
            </div>
        </CartItemContainer>
    )
}
