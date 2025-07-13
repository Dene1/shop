import { CartItem, CartTitle } from "./components/index.js"
import { Button, Loader } from "@components"
import { useEffect, useState } from "react"
import {
    CLOSE_MODAL,
    openModal,
    removeCartAsync,
    saveCartAsync,
    setCartData,
} from "@actions"
import { useDispatch, useSelector } from "react-redux"
import { selectCart, selectProducts } from "@selectors"
import styled from "styled-components"
import { request } from "@utils/request"

const StyledH1 = styled.h1`
    text-transform: uppercase;
    text-align: center;
`

const CartContainer = ({ className }) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const products = useSelector(selectProducts)
    const cartForUser = useSelector(selectCart)

    useEffect(() => {
        request("/cart").then((cart) => {
            dispatch(setCartData(cart.data))
        })
    }, [dispatch])

    const handleRemoveFromCart = (id) => {
        dispatch(
            openModal({
                text: "Delete the product?",
                onConfirm: () => {
                    dispatch(removeCartAsync(id))
                    dispatch(CLOSE_MODAL)
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            }),
        )
    }

    const increaseCount = (id) => {
        const cartItem = cartForUser.find((item) => item.id === id)

        if (cartItem) {
            dispatch(
                saveCartAsync(id, {
                    count: cartItem.count + 1,
                }),
            )
        }
    }

    const decreaseCount = (id) => {
        const cartItem = cartForUser.find((item) => item.id === id)

        if (cartItem) {
            dispatch(
                saveCartAsync(id, {
                    count: cartItem.count - 1,
                }),
            )
        }
    }

    const calculateTotal = () => {
        let total = 0

        for (let i = 0; i < cartForUser.length; i++) {
            const cartItem = cartForUser[i]
            const product = products.find((p) => p.id === cartItem.product_id)
            if (product) {
                total += Number(cartItem.count)
            }
        }
        return total
    }

    const calculateTotalPrice = () => {
        let total = 0

        for (let i = 0; i < cartForUser.length; i++) {
            const cartItem = cartForUser[i]
            const product = products.find((p) => p.id === cartItem.product_id)
            if (product) {
                total += Number(product.price) * Number(cartItem.count)
            }
        }
        return total
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
                            const product = products.find(
                                (p) => p.id === item.product_id,
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
                                {calculateTotal()}
                            </div>
                        </div>
                        <div className="total-item">
                            <h2>TOTAL</h2>
                            <div className="total-price">
                                $ {calculateTotalPrice()}
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
