import { deleteCart } from "../api/index.js"
import { getCart } from "../api/get-cart.js"
// import {ROLE} from "../constants/index.js"
// import {sessions} from "../sessions.js"

export const removeCart = async (hash, productId) => {
    await deleteCart(productId)

    const cart = await getCart(productId)

    return {
        error: null,
        res: {
            ...cart,
        },
    }
}
