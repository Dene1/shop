import { setCartData } from "./set-cart-data.js"
import { request } from "../utils/request.js"

export const loadCartAsync = () => (dispatch) =>
    request("/cart").then((carts) => {
        dispatch(setCartData(carts.data))
        return carts.data
    })
