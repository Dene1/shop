
import {updateItemCart} from "../api/index.js"
import {sessions} from "../sessions.js"
import {ROLE} from "../constants/index.js"

export const updateCart = async (hash, cartData) => {
    // const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER, ROLE.GUEST]
    //
    // const access = await sessions.access(hash, accessRoles)
    //
    // if (!access) {
    //     return {
    //         error: "Доступ запрещен",
    //         res: null,
    //     }
    // }
    console.log(cartData)
    const savedCartItem = await updateItemCart(cartData)
    console.log(savedCartItem)

    return {
        error: null,
        res: savedCartItem
    }
}
