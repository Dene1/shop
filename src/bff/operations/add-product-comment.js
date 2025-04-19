import {addReview, getProduct} from "../api"
import {sessions} from "../sessions.js"
import {ROLE} from "../constants/index.js"
import {getProductReviewsWithAuthor} from "../utils/index.js"

export const addProductComment = async (hash, userId, productId, content) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        }
    }

    await addReview(userId, productId, content)

    const product = await getProduct(productId)

    const commentsWithAuthor = await getProductReviewsWithAuthor(productId)

    return {
        error: null,
        res: {
            ...product,
            comments: commentsWithAuthor,
        },
    }
}
