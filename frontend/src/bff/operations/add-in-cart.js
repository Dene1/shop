import { sessions } from "../sessions.js"
import { ROLE } from "../constants/index.js"
import { addCart } from "../api/add-cart.js"

export const addInCart = async (
    hash,
    cartId,
    userId,
    productId,
    size,
    content,
) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Сначала авторизуйтесь",
            res: null,
        }
    }

    const cart = await addCart(cartId, userId, productId, size, content)

    return {
        error: null,
        res: cart,
    }
}
