import {FaRegCircle, FaRegTrashAlt} from "react-icons/fa";
import styled from "styled-components"

const CartItemContainer = ({
                               className,
                               product,
                               productDetails,
                               handleRemoveFromCart,
                               increaseCount,
                               decreaseCount
                           }) => {
    const disabled = () => productDetails.count <= 1

    return (
        <li className={className}>
            <div className="remove-from-cart">
                <FaRegTrashAlt size="22px"
                               onClick={() => handleRemoveFromCart(product.id)}
                />
            </div>

            <img src={product.imageUrl}
                 alt={product.title}
            />

            <div className="product-info">
                <div className="product-title">{product.title}</div>
                <div className="container">
                    <span>{product.gender}</span>
                    <span className="dot">
                        <FaRegCircle size="8px" />
                    </span>
                    <span>Size : {product.size}</span>
                </div>
                <div className="product-price">$ {product.price}</div>
            </div>
            <div className="quantity">
                <div className="quantity-title">
                    QTY
                </div>
                <div className="quantity-container">
                    <button className="q-btn"
                            onClick={() => increaseCount(product.id)}
                    >
                        +
                    </button>
                    <div className="q-value">{productDetails.count}X</div>
                    <button className="q-btn"
                            disabled={disabled()}
                            onClick={() => decreaseCount(product.id)}
                    >
                        -
                    </button>
                </div>
            </div>
            <div>
                <div className="subtotal-price">
                    <div>Subtotal</div>
                    <div className="subtotal-price-value">$ {product.price * productDetails.count}</div>
                </div>
            </div>
        </li>
    )
}

export const CartItem = styled(CartItemContainer)`
    display: flex;
    flex-direction: row;
    gap: 30px;
    margin: 20px 0 0 40px;

    .q-value {
        font-size: 18px;
        font-weight: 500;
    }

    .quantity-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    .dot {
        display: flex;
        align-items: center;
    }

    .container {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    .quantity {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        gap: 10px;
    }

    .quantity-title {
        padding-top: 1px;
        font-size: 18px;
    }

    .q-btn {
        font-size: 20px;
        width: 30px;
        height: 30px;
        background-color: #dedede;
        color: #2C3333;
        border: 1px solid #5b6969;

        &:hover {
            cursor: pointer;
            background-color: transparent;
            color: #2C3333;
            border: 1px solid #5b6969;
        }

        &:active {
            cursor: pointer;
            background-color: #EA454C;
            color: #dedede;
        }

        &:disabled {
            cursor: not-allowed;
            background-color: white;
            color: #5b6969;
            border: 1px solid #5b6969;
        }
    }

    .product-price {
        font-weight: 500;
        font-size: 20px;
    }

    .subtotal-price {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        gap: 10px;
    }

    .subtotal-price-value {
        font-weight: 500;
        font-size: 20px;
    }

    span {
        color: gray;
    }

    img {
        border: 1px solid #ccc;
        width: 130px;
        height: 100px;
    }

    .product-title {
        font-weight: bolder;
        font-size: 20px;
        text-transform: uppercase;
    }

    .product-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
    }

    .remove-from-cart {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
`
