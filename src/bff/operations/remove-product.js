import { deleteProduct, deleteReview, getReview } from "../api"
import { sessions } from "../sessions.js"
import { ROLE } from "../constants/index.js"

export const removeProduct = async (hash, id) => {
    const accessRoles = [ROLE.ADMIN]

    const access = await sessions.access(hash, accessRoles)

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        }
    }

    await deleteProduct(id)

    const reviews = await getReview(id)

    await Promise.all(reviews.map(({ id: reviewId }) => deleteReview(reviewId)))

    return {
        error: null,
        res: true,
    }
}
