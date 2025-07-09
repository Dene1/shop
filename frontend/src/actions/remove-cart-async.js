import { removeFromCart } from "./remove-cart-data.js"

export const removeCartAsync = (requestServer, productId) => (dispatch) => {
    console.log(productId)
    requestServer("removeCart", productId)
        .then(() => dispatch(removeFromCart(productId)))
}
