import { setCartData } from "./set-cart-data.js"
import { request } from "../utils/request.js"

export const loadCartAsync = (userId, cartData) => (dispatch) =>
    request(`/cart/${userId}`, cartData).then((updatedCart) => {
        dispatch(setCartData(updatedCart.data))
        return updatedCart.data
    })
