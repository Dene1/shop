import { transformReviews } from "../transformers/index.js"

const ALL_REVIEWS_URL = "/reviews"
const POST_REVIEWS_URL = "/reviews?product_id="

export const getReview = (productId) => {
    const url =
        productId === undefined ? ALL_REVIEWS_URL : POST_REVIEWS_URL + productId
    console.log(url)
    return fetch(url)
        .then((loadedReviews) => loadedReviews.json())
        .then((loadedReviews) => loadedReviews.map(transformReviews))
}
