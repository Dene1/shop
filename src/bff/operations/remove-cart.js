import { deleteCart } from "../api"
import { getCart } from "../api/get-cart.js"
// import {ROLE} from "../constants/index.js"
// import {sessions} from "../sessions.js"

export const removeCart = async (hash, productId) => {
    // const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]

    // const access = await sessions.access(hash, accessRoles)

    console.log(productId)

    await deleteCart(productId)

    const cart = await getCart(productId)

    console.log(cart)

    return {
        error: null,
        res: {
            ...cart
        }
    }
}
