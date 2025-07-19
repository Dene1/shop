import { removeFromCart } from "./remove-cart-data.js"
import { request } from "@/utils/request"

export const removeCartAsync = (id) => (dispatch) =>
    request(`/cart/${id}`, "DELETE").then(() => dispatch(removeFromCart(id)))
