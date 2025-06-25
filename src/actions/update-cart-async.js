import { updateCartData } from "./update-cart-data.js"

export const updateCartAsync = (requestServer, cartData) => (dispatch) =>
    requestServer("updateCart", cartData)
        .then((updatedCart) => dispatch(updateCartData(updatedCart.res)))
