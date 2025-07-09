import { removeReview } from "./remove-review.js"
import { request } from "../utils/request.js"

export const removeReviewAsync = (productId, id) => (dispatch) => {
    request(`/products/${productId}/reviews/${id}`, "DELETE").then(() =>
        dispatch(removeReview(id)),
    )
}
