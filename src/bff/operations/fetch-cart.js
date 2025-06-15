import {getRoles} from "../api"
import {sessions} from "../sessions.js"
import {ROLE} from "../constants"
import {getCart} from "../api/get-cart.js"

export const fetchCart = async (hash) => {
    // const accessRoles = [ROLE.ADMIN]
    //
    // const access = await sessions.access(hash, accessRoles)
    //
    // if (!access) {
    //     return {
    //         error: "Доступ запрещен",
    //         res: null,
    //     }
    // }

    const cart = await getCart()

    return {
        error: null,
        res: cart,
    }
}
