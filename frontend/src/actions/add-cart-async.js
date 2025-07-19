import { addCart } from "./add-cart.js"
import { request } from "@/utils/request"

export const addCartAsync = (newCartProductData) => (dispatch) =>
    request("/cart", "POST", newCartProductData).then((newCartProductData) =>
        dispatch(addCart(newCartProductData.data)),
    )
