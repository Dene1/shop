import { getProducts, getReview } from "../api"
import { getReviewsCount } from "../utils/index.js"

export const fetchProducts = async (searchPhrase, page, limit) => {
    const [{ products, links }, reviews] = await Promise.all([
        getProducts(searchPhrase, page, limit),
        getReview()])
    return {
        error: null,
        res: {
            products: products.map((product) => ({
                ...product,
                reviewsCount: getReviewsCount(reviews, product.id),
            })),
            links,
        },
    }
}
