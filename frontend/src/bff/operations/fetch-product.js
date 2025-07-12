import { getProduct } from "../api/index.js"
import { getProductReviewsWithAuthor } from "../utils/index.js"

export const fetchProduct = async (productId) => {
    let product
    let error

    try {
        product = await getProduct(productId)
    } catch (productError) {
        error = productError
    }

    if (error) {
        return {
            error,
            res: null,
        }
    }

    const reviewsWithAuthor = await getProductReviewsWithAuthor(productId)

    return {
        error: null,
        res: {
            ...product,
            reviews: reviewsWithAuthor,
        },
    }
}
