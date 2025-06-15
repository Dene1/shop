import {deleteCart} from "../api"
import {sessions} from "../sessions.js"
import {getCart} from "../api/get-cart.js"

export const removeCart = async (hash, productId) => {
    // const accessRoles = [ROLE.ADMIN]
    //
    // const access = await sessions.access(hash, accessRoles)


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
