import { deleteReview, getProduct } from "../api"
import { sessions } from "../sessions.js"
import { ROLE } from "../constants/index.js"
import { getProductReviewsWithAuthor } from "../utils/index.js"

export const removeProductReview = async (hash, productId, id) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        }
    }

    await deleteReview(id)

    const product = await getProduct(productId)

    const reviewsWithAuthor = await getProductReviewsWithAuthor(productId)

    return {
        error: null,
        res: {
            ...product,
            reviews: reviewsWithAuthor,
        },
    }
}
