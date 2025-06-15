import {Button} from "../../components/index.js"
import styled from "styled-components"
import {useEffect} from "react"
import {
    CLOSE_MODAL, loadCartAsync,
    openModal,
    removeCartAsync, setProductsData, updateCartAsync,
} from "../../actions/index.js"
import {useDispatch, useSelector} from "react-redux"
import {useServerRequest} from "../../hooks/index.js"
import {CartItem} from "./cart-item/index.js"
import {selectCarts, selectProducts} from "../../selectors/index.js"
import {getProductsForCart} from "../../bff/api/index.js"
import {getCart} from "../../bff/api/get-cart.js"

const StyledH2 = styled.h1`
    text-transform: uppercase;
    text-align: center;
`

const CartContainer = ({className}) => {
    const requestServer = useServerRequest()
    const dispatch = useDispatch()
    const carts = useSelector(selectCarts)
    const products = useSelector(selectProducts)
    console.log(carts)
    console.log(products)

    const handleRemoveFromCart = (productId) => {
        dispatch(openModal({
            text: "Удалить товар?",
            onConfirm: () => {
                dispatch(removeCartAsync(requestServer, productId));
                dispatch(CLOSE_MODAL);
            },
            onCancel: () => dispatch(CLOSE_MODAL),
        }))
    }

    const increaseCount = (productId) => {
        const cartItem = carts.find(item => item.id === productId);
        dispatch(updateCartAsync(requestServer, {
            id: productId,
            userId: cartItem.userId,
            count: cartItem.count + 1,
        }));
    }

    const decreaseCount = (productId) => {
        const cartItem = carts.find(item => item.id === productId);
        console.log(cartItem)
        dispatch(updateCartAsync(requestServer, {
            id: productId,
            userId: cartItem.userId,
            count: cartItem.count - 1,
        }))
    }

    const cartProductId = carts.map(item => item.id);
    const getProduct = products.filter((product) =>
        cartProductId.includes(product.id));
    console.log(cartProductId)

    const calculateTotal = () => {

        let total = 0;
        for (let i = 0; i < carts.length; i++) {
            total += Number(carts[i].price) * Number(carts[i].count)
            console.log(carts)
        }
        console.log(total)
        return total;
    };

    useEffect(() => {
        const fetchCart = async () => {
            const data = await getCart();
            dispatch(loadCartAsync(requestServer, data));
        }

        const fetchProduct = async () => {
            const data = await getProductsForCart();
            dispatch(setProductsData(data));
        }

        fetchCart()
        fetchProduct();
    }, [dispatch, requestServer])

    if (!carts || carts.length === 0) { // Check state data
        return (
            <div className={className}>
                <StyledH2>Shopping Cart</StyledH2>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className={className}>
            <StyledH2>Shopping Cart</StyledH2>
            {getProduct.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {getProduct.map((item) => {
                            const productDetails = carts.find(p => p.id === item.id);
                            return (
                                <CartItem key={item.id}
                                          product={item}
                                          productDetails={productDetails}
                                          decreaseCount={decreaseCount}
                                          increaseCount={increaseCount}
                                          handleRemoveFromCart={handleRemoveFromCart}
                                />
                            )
                        })}
                    </ul>

                    <div>
                        <div>Total Items : <span>{getProduct.length}</span></div>
                        <div>Total: ${calculateTotal()}</div>
                    </div>
                    <div className="checkout">
                        <Button width="25%">CHECKOUT</Button>
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
`
