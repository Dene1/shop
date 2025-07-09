import { sessions } from "../sessions.js"
import { ROLE } from "../constants/index.js"
import { addCart } from "../api/add-cart.js"

export const addInCart = async (hash, cartId, userId, productId, size, content) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Сначала авторизуйтесь",
            res: null,
        }
    }

    console.log(cartId, userId, productId, size, content)
    const cart = await addCart(cartId, userId, productId, size, content)
    console.log(cart)
    return {
        error: null,
        res: cart
    }
}
