import { request } from "../utils/request.js"
import { updateCartData } from "./update-cart-data.js"

export const saveCartAsync = (id, cartData) => (dispatch) =>
    request(`/cart/${id}`, "PATCH", cartData).then((updatedCart) => {
        dispatch(updateCartData(updatedCart.data))

        return updatedCart.data
    })
