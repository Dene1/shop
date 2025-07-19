import { CartItem, CartTitle } from "./components/index.js"
import { Button, Loader } from "@/components"
import { useEffect, useState } from "react"
import {
    CLOSE_MODAL,
    openModal,
    removeCartAsync,
    saveCartAsync,
    setCartData,
} from "@/actions"
import { useDispatch, useSelector } from "react-redux"
import { selectCart, selectProducts } from "@/selectors"
import { request } from "@/utils/request"
import { CartContainer, StyledH1 } from "@/pages/cart/cart.styles"
import { calculateTotal, calculateTotalPrice } from "@/pages/cart/utils"

export const Cart = () => {
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

    const total = calculateTotal(cartForUser, products)
    const totalPrice = calculateTotalPrice(cartForUser, products)

    setTimeout(() => {
        setIsLoading(false)
    }, 1000)

    return (
        <CartContainer>
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
                            <div className="total-price">{total}</div>
                        </div>
                        <div className="total-item">
                            <h2>TOTAL</h2>
                            <div className="total-price">$ {totalPrice}</div>
                        </div>
                    </div>
                    <div className="buttons-container">
                        <Button width="30%">Checkout</Button>
                        <Button width="30%"> Cancel </Button>
                    </div>
                </>
            )}
        </CartContainer>
    )
}
