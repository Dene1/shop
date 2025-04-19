import {transformReviews} from "../transformers"

const ALL_REVIEWS_URL = "http://localhost:3001/reviews"
const POST_REVIEWS_URL = "http://localhost:3001/reviews?product_id="

export const getReview = (productId) => {

    const url = productId === undefined ? ALL_REVIEWS_URL : POST_REVIEWS_URL + productId

    return fetch(url)
        .then((loadedReviews) => loadedReviews.json())
        .then((loadedReviews) => loadedReviews.map(transformReviews))
}
