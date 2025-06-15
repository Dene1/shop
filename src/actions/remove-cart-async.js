import {removeFromCart} from "./remove-cart-data.js"

export const removeCartAsync = (requestServer, productId) => (dispatch) => {
    requestServer("removeCart", productId)
        .then(() => dispatch(removeFromCart(productId)))
}
