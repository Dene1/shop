import { CartItem, CartTitle } from "./components/index.js"
import { Button, Loader } from "@components"
import { useState } from "react"
import {
    CLOSE_MODAL,
    openModal,
    removeCartAsync,
    updateCartAsync,
} from "@actions"
import { useDispatch, useSelector } from "react-redux"
import { useServerRequest } from "@hooks"
import { selectCarts, selectProducts, selectUserId } from "@selectors"
import styled from "styled-components"

const StyledH1 = styled.h1`
    text-transform: uppercase;
    text-align: center;
`

const CartContainer = ({ className }) => {
    const requestServer = useServerRequest()
    const dispatch = useDispatch()
    const carts = useSelector(selectCarts)
    const products = useSelector(selectProducts)
    const userId = useSelector(selectUserId)
    const [isLoading, setIsLoading] = useState(true)
    const cartForUser = carts.filter((item) => item.userId === userId)

    const handleRemoveFromCart = (productId) => {
        dispatch(
            openModal({
                text: "Удалить товар?",
                onConfirm: () => {
                    dispatch(removeCartAsync(requestServer, productId))
                    dispatch(CLOSE_MODAL)
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            }),
        )
    }

    const increaseCount = (productId) => {
        const cartItem = cartForUser.find((item) => item.id === productId)
        dispatch(
            updateCartAsync(requestServer, {
                id: productId,
                userId: cartItem.userId,
                productId: cartItem.productId,
                size: cartItem.size,
                count: cartItem.count + 1,
            }),
        )
    }

    const decreaseCount = (productId) => {
        const cartItem = cartForUser.find((item) => item.id === productId)
        dispatch(
            updateCartAsync(requestServer, {
                id: productId,
                userId: cartItem.userId,
                productId: cartItem.productId,
                size: cartItem.size,
                count: cartItem.count - 1,
            }),
        )
    }
    console.log(products)

    const getProduct = products.filter((product) =>
        cartForUser.map((item) => item.productId).includes(product.id),
    )

    const calculateTotal = () => {
        let total = 0

        for (let i = 0; i < cartForUser.length; i++) {
            const cartItem = cartForUser[i]
            const product = getProduct.find((p) => p.id === cartItem.productId)
            if (product) {
                total += Number(product.price) * Number(cartItem.count)
            }
        }
        return total
    }

    const calculateTotalCount = () => {
        let totalCount = 0
        for (let i = 0; i < cartForUser.length; i++) {
            totalCount += Number(cartForUser[i].count)
        }
        return totalCount
    }

    setTimeout(() => {
        setIsLoading(false)
    }, 1000)

    return (
        <div className={className}>
            <StyledH1>Shopping Cart</StyledH1>
            {isLoading ? (
                <Loader isLoading={isLoading} />
            ) : cartForUser.length === 0 ? (
                <CartTitle />
            ) : (
                <>
                    <ul>
                        {cartForUser.map((item) => {
                            const product = getProduct.find(
                                (p) => p.id === item.productId,
                            )
                            return (
                                <CartItem
                                    key={item.id}
                                    product={product}
                                    productDetails={item}
                                    decreaseCount={decreaseCount}
                                    increaseCount={increaseCount}
                                    handleRemoveFromCart={handleRemoveFromCart}
                                />
                            )
                        })}
                    </ul>

                    <div className="total">
                        <div className="total-item">
                            <h2>TOTAL ITEM</h2>
                            <div className="total-price">
                                {calculateTotalCount()}
                            </div>
                        </div>
                        <div className="total-item">
                            <h2>TOTAL</h2>
                            <div className="total-price">
                                $ {calculateTotal()}
                            </div>
                        </div>
                    </div>
                    <div className="buttons-container">
                        <Button width="30%">Checkout</Button>
                        <Button width="30%"> Cancel </Button>
                    </div>
                </>
            )}
        </div>
    )
}

export const Cart = styled(CartContainer)`
    ul {
        list-style-type: disc;
    }

    .total {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-right: 30.6%;
        font-size: 20px;
        gap: 30px;
        text-align: center;
    }

    h2 {
        font:
            500 24px "Bebas Neue",
            sans-serif;
        letter-spacing: 1px;
        color: gray;
    }

    span {
        color: gray;
    }

    .total-item {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .total-price {
        font:
            500 34px "Bebas Neue",
            sans-serif;
        letter-spacing: 1px;
    }

    .buttons-container {
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 100px;
    }
`
